"use client";
import { create } from 'zustand';

type LoadingState = {
   isTransitioning: boolean;
   isPageLoading: boolean;
   isFetching: boolean;
   isManualLoading: boolean;
   setTransitioning: (loading: boolean) => void;
   setPageLoading: (loading: boolean) => void;
   setFetching: (loading: boolean) => void;
   setManualLoading: (loading: boolean) => void;
}

const useGlobalLoading = create<LoadingState>((set, get) => ({
  isTransitioning: false,
  isPageLoading: false,
  isFetching: false,
  isManualLoading: false,
  
  setTransitioning: (loading) => set({ isTransitioning: loading }),
  setPageLoading: (loading) => set({ isPageLoading: loading }),
  setFetching: (loading) => set({ isFetching: loading }),
  setManualLoading: (loading) => set({ isManualLoading: loading }),
}));

export default useGlobalLoading;