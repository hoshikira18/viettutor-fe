import { create } from "zustand";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Child, ChildForm } from "@/types";

interface ChildrenState {
  children: Child[];
  selectedChild: Child | null;
  loading: boolean;
  error: string | null;
  unsubscribe: Unsubscribe | null;

  // Actions
  fetchChildren: (parentId: string) => Promise<void>;
  addChild: (parentId: string, childData: ChildForm) => Promise<void>;
  updateChild: (childId: string, data: Partial<ChildForm>) => Promise<void>;
  deleteChild: (childId: string) => Promise<void>;
  selectChild: (child: Child | null) => void;
  clearError: () => void;
  subscribeToChildren: (parentId: string) => void;
  unsubscribeFromChildren: () => void;
}

export const useChildrenStore = create<ChildrenState>((set, get) => ({
  children: [],
  selectedChild: null,
  loading: false,
  error: null,
  unsubscribe: null,

  fetchChildren: async (parentId: string) => {
    set({ loading: true, error: null });

    try {
      const childrenQuery = query(
        collection(db, "children"),
        where("parentId", "==", parentId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(childrenQuery);
      const children = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Child[];

      set({
        children,
        loading: false,
      });
    } catch (error: any) {
      console.error("Error fetching children:", error);
      set({
        error: "Có lỗi xảy ra khi tải danh sách con em",
        loading: false,
      });
    }
  },

  addChild: async (parentId: string, childData: ChildForm) => {
    set({ loading: true, error: null });

    try {
      const newChild = {
        parentId,
        ...childData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "children"), newChild);

      const childWithId: Child = {
        id: docRef.id,
        ...newChild,
      };

      set((state) => ({
        children: [childWithId, ...state.children],
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error adding child:", error);
      set({
        error: "Có lỗi xảy ra khi thêm thông tin con em",
        loading: false,
      });
      throw error;
    }
  },

  updateChild: async (childId: string, data: Partial<ChildForm>) => {
    set({ loading: true, error: null });

    try {
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, "children", childId), updateData);

      set((state) => ({
        children: state.children.map((child) =>
          child.id === childId ? { ...child, ...updateData } : child
        ),
        selectedChild:
          state.selectedChild?.id === childId
            ? { ...state.selectedChild, ...updateData }
            : state.selectedChild,
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error updating child:", error);
      set({
        error: "Có lỗi xảy ra khi cập nhật thông tin con em",
        loading: false,
      });
      throw error;
    }
  },

  deleteChild: async (childId: string) => {
    set({ loading: true, error: null });

    try {
      await deleteDoc(doc(db, "children", childId));

      set((state) => ({
        children: state.children.filter((child) => child.id !== childId),
        selectedChild:
          state.selectedChild?.id === childId ? null : state.selectedChild,
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error deleting child:", error);
      set({
        error: "Có lỗi xảy ra khi xóa thông tin con em",
        loading: false,
      });
      throw error;
    }
  },

  selectChild: (child: Child | null) => {
    set({ selectedChild: child });
  },

  clearError: () => {
    set({ error: null });
  },

  subscribeToChildren: (parentId: string) => {
    // Unsubscribe from previous subscription if any
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
    }

    const childrenQuery = query(
      collection(db, "children"),
      where("parentId", "==", parentId),
      orderBy("createdAt", "desc")
    );

    const newUnsubscribe = onSnapshot(
      childrenQuery,
      (snapshot) => {
        const children = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Child[];

        set({ children });
      },
      (error) => {
        console.error("Error in children subscription:", error);
        set({ error: "Có lỗi xảy ra khi theo dõi thay đổi dữ liệu" });
      }
    );

    set({ unsubscribe: newUnsubscribe });
  },

  unsubscribeFromChildren: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
      set({ unsubscribe: null });
    }
  },
}));
