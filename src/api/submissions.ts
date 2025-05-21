import { baseUrl } from '.';

export const getSubmissions = async () => {
  try {
    const response = await fetch(`${baseUrl}/submissions`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return null;
  }
};

export const createSubmission = async (data: any) => {
  console.log(data);
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
