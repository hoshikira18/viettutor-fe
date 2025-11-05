import { create } from "zustand";
import {
  collection,
  query as firestoreQuery,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentSnapshot,
  QueryConstraint,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tutor, SearchFilters, SearchResult } from "@/types";
import { mockTutors, filterMockTutors } from "@/lib/mockData";

interface TutorSearchState {
  tutors: Tutor[];
  totalCount: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: SearchFilters;
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;

  // Actions
  searchTutors: (query?: string, resetResults?: boolean) => Promise<void>;
  loadMoreTutors: () => Promise<void>;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
  clearResults: () => void;
}

const defaultFilters: SearchFilters = {
  subjects: [],
  maxHourlyRate: 1000000, // 1M VND
  minRating: 0,
  districts: [],
  availability: {
    days: [],
    timeRange: {
      start: "",
      end: "",
    },
  },
  verificationStatus: false,
  isOnline: false,
  experience: {
    min: 0,
    max: 50,
  },
  languages: [],
};

export const useTutorSearchStore = create<TutorSearchState>((set, get) => ({
  tutors: [],
  totalCount: 0,
  hasMore: true,
  loading: false,
  error: null,
  searchQuery: "",
  filters: defaultFilters,
  lastDoc: null,

  searchTutors: async (query = "", resetResults = true) => {
    const { filters } = get();

    if (resetResults) {
      set({
        loading: true,
        error: null,
        tutors: [],
        lastDoc: null,
        hasMore: true,
        searchQuery: query,
      });
    } else {
      set({ loading: true, error: null });
    }

    try {
      // Simulate API delay for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use mock data for development
      const filteredTutors = filterMockTutors({
        subjects: filters.subjects,
        districts: filters.districts,
        maxRate:
          filters.maxHourlyRate < 1000000 ? filters.maxHourlyRate : undefined,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        query: query.trim() || undefined,
      });

      // Apply additional filters
      let finalTutors = filteredTutors;

      // Verification status filter
      if (filters.verificationStatus) {
        finalTutors = finalTutors.filter(
          (tutor) => tutor.verificationStatus.overall === "verified"
        );
      }

      // Online status filter
      if (filters.isOnline) {
        finalTutors = finalTutors.filter((tutor) => tutor.isOnline);
      }

      // Experience filter
      if (filters.experience.min > 0) {
        finalTutors = finalTutors.filter(
          (tutor) => tutor.experience >= filters.experience.min
        );
      }
      if (filters.experience.max < 50) {
        finalTutors = finalTutors.filter(
          (tutor) => tutor.experience <= filters.experience.max
        );
      }

      // Languages filter
      if (filters.languages.length > 0) {
        finalTutors = finalTutors.filter((tutor) =>
          tutor.languages.some((lang) => filters.languages.includes(lang))
        );
      }

      // Sort by rating descending
      finalTutors.sort((a, b) => b.rating - a.rating);

      // Simulate pagination
      const pageSize = 12;
      const { tutors: currentTutors } = get();
      const startIndex = resetResults ? 0 : currentTutors.length;
      const endIndex = startIndex + pageSize;
      const paginatedTutors = finalTutors.slice(startIndex, endIndex);
      const hasMore = endIndex < finalTutors.length;

      set((state) => ({
        tutors: resetResults
          ? paginatedTutors
          : [...state.tutors, ...paginatedTutors],
        totalCount: finalTutors.length,
        hasMore: hasMore,
        lastDoc: null, // Not used with mock data
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error searching tutors:", error);
      set({
        error: "Có lỗi xảy ra khi tìm kiếm gia sư",
        loading: false,
      });
    }
  },

  loadMoreTutors: async () => {
    const { hasMore, loading, searchQuery } = get();

    if (!hasMore || loading) return;

    await get().searchTutors(searchQuery, false);
  },

  setFilters: (newFilters: Partial<SearchFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({
      filters: defaultFilters,
      tutors: [],
      totalCount: 0,
      hasMore: true,
      lastDoc: null,
    });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearError: () => {
    set({ error: null });
  },

  clearResults: () => {
    set({
      tutors: [],
      totalCount: 0,
      hasMore: true,
      lastDoc: null,
      searchQuery: "",
    });
  },
}));
