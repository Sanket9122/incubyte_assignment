
const MOCK_USER = {
  id: 99,
  username: 'admin@sweetshop.com',
  role: 'admin', 
  token: 'mock-jwt-token-admin' 
};

export const login = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (email === MOCK_USER.username && password === 'admin123') {
    localStorage.setItem('user', JSON.stringify(MOCK_USER));
    return MOCK_USER;
  }
  throw new Error('Invalid email or password.');
};

export const register = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newUser = { id: 100, username: email, role: 'customer', token: 'mock-jwt-token-customer' };
  localStorage.setItem('user', JSON.stringify(newUser));
  return newUser;
};

export const logout = () => {
  localStorage.removeItem('user');
};