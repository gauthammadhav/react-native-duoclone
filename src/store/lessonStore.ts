import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LessonState {
  /** Set of lesson IDs the user has fully completed */
  completedLessonIds: string[];
  /** The lesson currently in progress (only one at a time) */
  inProgressLessonId: string | null;

  markCompleted: (lessonId: string) => void;
  setInProgress: (lessonId: string | null) => void;
  isCompleted: (lessonId: string) => boolean;
  isInProgress: (lessonId: string) => boolean;
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      completedLessonIds: [],
      inProgressLessonId: null,

      markCompleted: (lessonId) =>
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(lessonId)
            ? state.completedLessonIds
            : [...state.completedLessonIds, lessonId],
          inProgressLessonId:
            state.inProgressLessonId === lessonId
              ? null
              : state.inProgressLessonId,
        })),

      setInProgress: (lessonId) => set({ inProgressLessonId: lessonId }),

      isCompleted: (lessonId) =>
        get().completedLessonIds.includes(lessonId),

      isInProgress: (lessonId) =>
        get().inProgressLessonId === lessonId,
    }),
    {
      name: 'lesson-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
