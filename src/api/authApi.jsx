const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "";

export const signup = async (formData) => {
  try {
    console.log(formData);
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Đăng ký thất bại");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};
