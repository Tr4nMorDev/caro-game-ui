const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

export const signup = async (formData) => {
  try {
    console.log(formData);
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
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
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
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

export const signin = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

export const signout = async (token) => {
  try {
    console.log(token);
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Nếu backend cần token để xác thực logout
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Đăng xuất thất bại");
    }

    return await response.json(); // có thể return message, v.v.
  } catch (err) {
    throw err;
  }
};

export const startMatchmaking = async (token) => {
  try {
    console.log("token :", token);
    const response = await fetch(`${API_BASE_URL}/api/matchmaking/start`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      let errorMessage = "Tìm trận thất bại";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        // response không phải JSON (như HTML 404)
        console.error("Không parse được JSON:", parseError);
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const cancelMatchmaking = async (token) => {
  try {
    console.log("token :", token);
    const response = await fetch(`${API_BASE_URL}/api/matchmaking/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      let errorMessage = "Hủy tìm trận thất bại";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        // response không phải JSON (như HTML 404)
        console.error("Không parse được JSON:", parseError);
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const takeuser = async (token, userId) => {
  try {
    const reponse = await fetch(
      `${API_BASE_URL}/api/matchmaking/opponent?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await reponse.json();
  } catch (error) {
    console.log("error : ", error);
  }
};

export const exitCurrentMatch = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/match/exit`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to exit match");
  }

  return await res.json();
};

export const startMatchWithAI = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/play-with-ai`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // log thêm lỗi nếu có
    console.error("❌ Server error:", errorText);
    throw new Error("❌ Không thể bắt đầu game với AI.");
  }

  // ✅ check nếu có nội dung
  const text = await response.text();
  if (!text) {
    console.warn("⚠️ Empty response body from /play-with-ai");
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ JSON parse error:", err.message, text);
    throw new Error("❌ Lỗi khi phân tích phản hồi từ server.");
  }
};

export const move = async (token , newBoard , index) => {
  try {
      const response = await fetch(`${API_BASE_URL}/api/play-with-ai/move`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ board: newBoard, moveIndex: index }),
      });
      const result = await response.json();
      return result;
  }catch (err){
    console.log(err.message)
  } 
}
export const OutPlayWithAI = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/play-with-ai/exit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      const result = await response.json();
      console.log(result)
      return result;
    }catch (err){
      console.log(err.message)
  } 
}