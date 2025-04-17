import { NewRequest, Request } from '@/types';
import { baseUrl } from '.';

export const getRequests = async () => {
  try {
    const response = await fetch(`${baseUrl}/requests`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching requests:', error);
    return null;
  }
};

export const createRequest = async (request: NewRequest) => {
  try {
    const response = await fetch(`${baseUrl}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating request:', error);
    return null;
  }
};

export const updateRequest = async (request: Request) => {
  try {
    const response = await fetch(`${baseUrl}/requests/${request.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating request:', error);
    return null;
  }
};
