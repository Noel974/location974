import axios from 'axios';

export const loginAdmin = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:3100/api/auth/admin/login', {
    email,
    password,
  });
  return response.data;
};
