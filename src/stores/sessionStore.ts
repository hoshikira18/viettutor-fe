import { create } from "zustand";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query as firestoreQuery,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Session, SessionBookingForm, Inquiry, InquiryForm } from "@/types";

interface SessionState {
  upcomingSessions: Session[];
  sessionHistory: Session[];
  inquiries: Inquiry[];
  loading: boolean;
  error: string | null;
  unsubscribe: Unsubscribe | null;

  // Actions
  fetchUpcomingSessions: (parentId: string) => Promise<void>;
  fetchSessionHistory: (parentId: string) => Promise<void>;
  fetchInquiries: (parentId: string) => Promise<void>;
  bookSession: (
    data: SessionBookingForm & { parentId: string; tutorId: string }
  ) => Promise<void>;
  cancelSession: (sessionId: string) => Promise<void>;
  sendInquiry: (
    tutorId: string,
    data: InquiryForm & { parentId: string }
  ) => Promise<void>;
  updateInquiry: (inquiryId: string, data: Partial<Inquiry>) => Promise<void>;
  subscribeToSessions: (parentId: string) => void;
  unsubscribeFromSessions: () => void;
  clearError: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  upcomingSessions: [],
  sessionHistory: [],
  inquiries: [],
  loading: false,
  error: null,
  unsubscribe: null,

  fetchUpcomingSessions: async (parentId: string) => {
    set({ loading: true, error: null });

    try {
      const now = new Date();
      const sessionsQuery = firestoreQuery(
        collection(db, "sessions"),
        where("parentId", "==", parentId),
        where("dateTime", ">=", now),
        where("status", "in", ["scheduled", "confirmed"]),
        orderBy("dateTime", "asc")
      );

      const snapshot = await getDocs(sessionsQuery);
      const sessions = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          dateTime: data.dateTime?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      }) as Session[];

      set({
        upcomingSessions: sessions,
        loading: false,
      });
    } catch (error: any) {
      console.error("Error fetching upcoming sessions:", error);
      set({
        error: "Có lỗi xảy ra khi tải lịch học sắp tới",
        loading: false,
      });
    }
  },

  fetchSessionHistory: async (parentId: string) => {
    set({ loading: true, error: null });

    try {
      const sessionsQuery = firestoreQuery(
        collection(db, "sessions"),
        where("parentId", "==", parentId),
        where("status", "in", ["completed", "cancelled", "no-show"]),
        orderBy("dateTime", "desc")
      );

      const snapshot = await getDocs(sessionsQuery);
      const sessions = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          dateTime: data.dateTime?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      }) as Session[];

      set({
        sessionHistory: sessions,
        loading: false,
      });
    } catch (error: any) {
      console.error("Error fetching session history:", error);
      set({
        error: "Có lỗi xảy ra khi tải lịch sử học tập",
        loading: false,
      });
    }
  },

  fetchInquiries: async (parentId: string) => {
    set({ loading: true, error: null });

    try {
      const inquiriesQuery = firestoreQuery(
        collection(db, "inquiries"),
        where("parentId", "==", parentId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(inquiriesQuery);
      const inquiries = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          viewedAt: data.viewedAt?.toDate() || undefined,
          respondedAt: data.respondedAt?.toDate() || undefined,
        };
      }) as Inquiry[];

      set({
        inquiries,
        loading: false,
      });
    } catch (error: any) {
      console.error("Error fetching inquiries:", error);
      set({
        error: "Có lỗi xảy ra khi tải danh sách liên hệ",
        loading: false,
      });
    }
  },

  bookSession: async (
    data: SessionBookingForm & { parentId: string; tutorId: string }
  ) => {
    set({ loading: true, error: null });

    try {
      const sessionData = {
        parentId: data.parentId,
        tutorId: data.tutorId,
        childId: data.childId,
        subject: data.subject,
        dateTime: new Date(`${data.date} ${data.time}`),
        duration: data.duration,
        type: data.type,
        location: data.location,
        status: "scheduled" as const,
        notes: data.notes,
        price: 0, // Will be calculated based on tutor's hourly rate
        paymentStatus: "pending" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "sessions"), sessionData);

      const sessionWithId: Session = {
        id: docRef.id,
        ...sessionData,
      };

      set((state) => ({
        upcomingSessions: [sessionWithId, ...state.upcomingSessions].sort(
          (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
        ),
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error booking session:", error);
      set({
        error: "Có lỗi xảy ra khi đặt lịch học",
        loading: false,
      });
      throw error;
    }
  },

  cancelSession: async (sessionId: string) => {
    set({ loading: true, error: null });

    try {
      await updateDoc(doc(db, "sessions", sessionId), {
        status: "cancelled",
        updatedAt: new Date(),
      });

      set((state) => ({
        upcomingSessions: state.upcomingSessions.filter(
          (session) => session.id !== sessionId
        ),
        sessionHistory: [
          ...state.sessionHistory,
          ...state.upcomingSessions
            .filter((session) => session.id === sessionId)
            .map((session) => ({ ...session, status: "cancelled" as const })),
        ],
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error cancelling session:", error);
      set({
        error: "Có lỗi xảy ra khi hủy lịch học",
        loading: false,
      });
      throw error;
    }
  },

  sendInquiry: async (
    tutorId: string,
    data: InquiryForm & { parentId: string }
  ) => {
    set({ loading: true, error: null });

    try {
      const inquiryData = {
        parentId: data.parentId,
        tutorId,
        childId: data.childId,
        message: data.message,
        status: "sent" as const,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "inquiries"), inquiryData);

      const inquiryWithId: Inquiry = {
        id: docRef.id,
        ...inquiryData,
      };

      set((state) => ({
        inquiries: [inquiryWithId, ...state.inquiries],
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error sending inquiry:", error);
      set({
        error: "Có lỗi xảy ra khi gửi liên hệ",
        loading: false,
      });
      throw error;
    }
  },

  updateInquiry: async (inquiryId: string, data: Partial<Inquiry>) => {
    set({ loading: true, error: null });

    try {
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, "inquiries", inquiryId), updateData);

      set((state) => ({
        inquiries: state.inquiries.map((inquiry) =>
          inquiry.id === inquiryId ? { ...inquiry, ...updateData } : inquiry
        ),
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error updating inquiry:", error);
      set({
        error: "Có lỗi xảy ra khi cập nhật liên hệ",
        loading: false,
      });
      throw error;
    }
  },

  subscribeToSessions: (parentId: string) => {
    // Unsubscribe from previous subscription if any
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
    }

    const now = new Date();
    const sessionsQuery = firestoreQuery(
      collection(db, "sessions"),
      where("parentId", "==", parentId),
      where("dateTime", ">=", now),
      orderBy("dateTime", "asc")
    );

    const newUnsubscribe = onSnapshot(
      sessionsQuery,
      (snapshot) => {
        const sessions = snapshot.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...data,
            dateTime: data.dateTime?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        }) as Session[];

        set({ upcomingSessions: sessions });
      },
      (error) => {
        console.error("Error in sessions subscription:", error);
        set({ error: "Có lỗi xảy ra khi theo dõi thay đổi lịch học" });
      }
    );

    set({ unsubscribe: newUnsubscribe });
  },

  unsubscribeFromSessions: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
      set({ unsubscribe: null });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
