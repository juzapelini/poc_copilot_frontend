// services/loginService.ts
export const checkToken = async (token: string | null): Promise<boolean> => {
  if (!token) return false;

  try {
    const response = await fetch('http://localhost:5001/users/isLoggedIn', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

export const login = async (email: string, password: string): Promise<{ token?: string, message?: string }> => {
  try {
    const response = await fetch('http://localhost:5001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return { token: data.token };
    } else {
      const errorData = await response.json();
      return { message: errorData.message };
    }
  } catch (error) {
    console.error('Login failed:', error);
    return { message: 'An error occurred during login' };
  }
};