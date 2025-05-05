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

export const getUser = async (ein: string, lastName: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/users/${ein}?lastName=${lastName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const authenticateUser = async (ein: string, lastName: string) => {
  try {
    const response = await fetch(`${baseUrl}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ein, lastName }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return { error: 'Error authenticating user' };
  }
};
