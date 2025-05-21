import { create } from 'zustand';
import { User } from '@/types';

interface FormStepper {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;

  includePayrollDeduction: boolean;
  setIncludePayrollDeduction: (include: boolean) => void;

  user: User;
  setUser: (user: User) => void;

  park: string;
  setPark: (park: string) => void;

  fullTicketCount: number;
  setFullTicketCount: (count: number) => void;
  mealTicketCount: number;
  setMealTicketCount: (count: number) => void;
  providedTicketCount: number;
  setProvidedTicketCount: (count: number) => void;

  payrollDeductionAmount: number;
  setPayrollDeductionAmount: (amount: number) => void;

  deductionPeriod: number;
  setDeductionPeriod: (period: number) => void;
}

export const useFormStepper = create<FormStepper>()((set) => ({
  currentStep: 0,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  incrementCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  decrementCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep - 1 })),
  includePayrollDeduction: false,
  setIncludePayrollDeduction: (include: boolean) =>
    set({ includePayrollDeduction: include }),
  park: '',
  setPark: (park: string) => set({ park }),
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
  fullTicketCount: 0,
  setFullTicketCount: (count: number) => set({ fullTicketCount: count }),
  mealTicketCount: 0,
  setMealTicketCount: (count: number) => set({ mealTicketCount: count }),
  providedTicketCount: 0,
  setProvidedTicketCount: (count: number) =>
    set({ providedTicketCount: count }),
  payrollDeductionAmount: 0,
  setPayrollDeductionAmount: (amount: number) =>
    set({ payrollDeductionAmount: amount }),
  deductionPeriod: 0,
  setDeductionPeriod: (period: number) => set({ deductionPeriod: period }),
}));
