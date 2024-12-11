const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
console.log(apiUrl);

export const sendFormData = async (formData: {
  firstName: string;
  lastName: string;
  mail: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${apiUrl}/sendMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
