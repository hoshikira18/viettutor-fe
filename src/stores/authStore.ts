import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { Parent } from "@/types";

interface AuthState {
  user: Parent | null;
  firebaseUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Parent>) => Promise<void>;
  clearError: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  firebaseUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialized: false,

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as Parent;
            set({
              user: userData,
              firebaseUser,
              isAuthenticated: true,
              initialized: true,
              loading: false,
            });
          } else {
            // User document doesn't exist, sign out
            await firebaseSignOut(auth);
            set({
              user: null,
              firebaseUser: null,
              isAuthenticated: false,
              initialized: true,
              loading: false,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({
            error: "Có lỗi xảy ra khi tải thông tin người dùng",
            initialized: true,
            loading: false,
          });
        }
      } else {
        set({
          user: null,
          firebaseUser: null,
          isAuthenticated: false,
          initialized: true,
          loading: false,
        });
      }
    });

    // Return unsubscribe function (optional, for cleanup)
    return unsubscribe;
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      if (!userDoc.exists()) {
        throw new Error("Không tìm thấy thông tin người dùng");
      }

      const userData = userDoc.data() as Parent;

      // Check if user is a parent
      if (userData.role !== "parent") {
        await firebaseSignOut(auth);
        throw new Error(
          "Chỉ phụ huynh mới được phép đăng nhập vào ứng dụng này"
        );
      }

      set({
        user: userData,
        firebaseUser,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      let errorMessage = "Có lỗi xảy ra khi đăng nhập";

      if (error.code === "auth/user-not-found") {
        errorMessage = "Không tìm thấy tài khoản với email này";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Mật khẩu không chính xác";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email không hợp lệ";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Quá nhiều lần thử. Vui lòng thử lại sau";
      } else if (error.message) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        loading: false,
      });

      throw error;
    }
  },

  signUp: async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => {
    set({ loading: true, error: null });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Create parent document in Firestore
      const parentData: Parent = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        phone,
        role: "parent",
        preferences: {
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
          timezone: "Asia/Ho_Chi_Minh",
          language: "vi",
          currency: "VND",
        },
        favoriteTutors: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), parentData);

      set({
        user: parentData,
        firebaseUser,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      let errorMessage = "Có lỗi xảy ra khi đăng ký";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email này đã được sử dụng";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email không hợp lệ";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn";
      }

      set({
        error: errorMessage,
        loading: false,
      });

      throw error;
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Check if user already exists
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      let userData: Parent;

      if (userDoc.exists()) {
        userData = userDoc.data() as Parent;

        // Check if user is a parent
        if (userData.role !== "parent") {
          await firebaseSignOut(auth);
          throw new Error(
            "Chỉ phụ huynh mới được phép đăng nhập vào ứng dụng này"
          );
        }
      } else {
        // Create new parent document
        userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || "Phụ huynh",
          avatar: firebaseUser.photoURL || undefined,
          role: "parent",
          preferences: {
            notifications: {
              email: true,
              push: true,
              sms: false,
            },
            timezone: "Asia/Ho_Chi_Minh",
            language: "vi",
            currency: "VND",
          },
          favoriteTutors: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(doc(db, "users", firebaseUser.uid), userData);
      }

      set({
        user: userData,
        firebaseUser,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      let errorMessage = "Có lỗi xảy ra khi đăng nhập với Google";

      if (error.message) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        loading: false,
      });

      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });

    try {
      await firebaseSignOut(auth);
      set({
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: "Có lỗi xảy ra khi đăng xuất",
        loading: false,
      });
      throw error;
    }
  },

  updateProfile: async (data: Partial<Parent>) => {
    const { user } = get();
    if (!user) return;

    set({ loading: true, error: null });

    try {
      const updatedUser = {
        ...user,
        ...data,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, "users", user.id), updatedUser);

      set({
        user: updatedUser,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: "Có lỗi xảy ra khi cập nhật thông tin",
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
