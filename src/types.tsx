export type User = {
  id: string;
  lastName: string;
  firstName?: string;
  ein: number;
  jobNumber?: string;
  email: string;
  children: number;
  guest: boolean;
  createdAt?: string;
  updatedAt?: string;
  submissions?: Submission[];
};

export type Submission = {
  id: string;
  park: string;
  fullTicket: number;
  mealTicket: number;
  payrollDeduction: boolean;
  deductionPeriod: number;
  childrenVerification: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  user: User;
};
