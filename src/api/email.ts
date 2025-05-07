import { baseUrl } from '.';

export const sendEmail = async (to: string, subject: string, text: string) => {
  const response = await fetch(`${baseUrl}/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, text }),
  });
  return response.json();
};
