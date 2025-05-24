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

export const googleLogin = async (idToken) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Lỗi đăng nhập Google");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Đăng nhập thất bại");
    }

    return await response.json(); // chứa token và user
  } catch (err) {
    throw err;
  }
};
