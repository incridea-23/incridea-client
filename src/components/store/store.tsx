import { create } from "zustand";

type State = {
  eventDex: boolean;
  sponsor: boolean;
  setEventDex: () => void;
  setSponsor: () => void;
};

const useStore = create<State>((set) => ({
  eventDex: false,
  sponsor: false,
  setEventDex: () => set((state) => ({ eventDex: !state.eventDex })),
  setSponsor: () => set((state) => ({ sponsor: !state.sponsor })),
}));

export default useStore;
