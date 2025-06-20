import { baseUrl } from '.';

export const getSubmissions = async () => {
  try {
    const response = await fetch(`${baseUrl}/submissions?include=user`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return null;
  }
};

export const createSubmission = async (data: any) => {
  try {
    const response = await fetch(`${baseUrl}/submissions`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating submission:', error);
    return null;
  }
};

export const updateSubmission = async (id: string, data: any) => {
  try {
    const response = await fetch(`${baseUrl}/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating submission:', error);
    return null;
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/submissions/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting submission:', error);
    return null;
  }
};
