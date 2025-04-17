export type Request = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type NewRequest = Omit<
  Request,
  'id' | 'description' | 'createdAt' | 'updatedAt'
>;

export type User = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
