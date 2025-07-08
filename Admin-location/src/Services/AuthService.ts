import axios from 'axios';

export const loginAdmin = async (email: string, password: string) => {
  const response = await axios.post('https://location974.onrender.com/api/auth/admin/login', {
    email,
    password,
  });
  return response.data;
};
