import { baseUrl } from '.';

export const getUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
