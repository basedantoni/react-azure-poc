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
