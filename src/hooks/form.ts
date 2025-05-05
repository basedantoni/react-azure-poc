import { create } from 'zustand';
import { User } from '@/types';

interface FormStepper {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;
  includeStep3: boolean;
  setIncludeStep3: (include: boolean) => void;
  user: User;
  setUser: (user: User) => void;
}

export const useFormStepper = create<FormStepper>()((set) => ({
  currentStep: 0,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  incrementCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  decrementCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep - 1 })),
  includeStep3: false,
  setIncludeStep3: (include: boolean) => set({ includeStep3: include }),
  user: {
    id: '',
    ein: 0,
    lastName: '',
    firstName: '',
    jobNumber: '',
    email: '',
    children: 0,
    guest: false,
    createdAt: '',
    updatedAt: '',
  },
  setUser: (user: User) => set({ user }),
}));
