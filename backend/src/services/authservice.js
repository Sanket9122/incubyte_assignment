const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

const mockUsers = [
    { id: '101', email: 'admin@sweetshop.com', passwordHash: 'hashed_admin123', role: 'admin' },
    { id: '102', email: 'user@sweetshop.com', passwordHash: 'hashed_user123', role: 'customer' },
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role }, 
    JWT_SECRET, 
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};


exports.register = async (email, password) => {
    // 1.  Checking if user exists in DB.
    if (mockUsers.find(u => u.email === email)) {
        throw new SweetServiceError('User already registered.', 409); 
    }

    
    const newUser = {
        id: (Math.random() * 1000).toFixed(0),
        email,
        passwordHash: 'placeholder_hash',
        role: 'customer' 
    };

   
    mockUsers.push(newUser); 
    
    const token = generateToken(newUser);
    return { token, user: newUser };
};


exports.login = async (email, password) => {
    // 1. searching user in DB
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
        throw new SweetServiceError('Invalid email or password.', 401); // 401 Unauthorized
    }

    
    const isMatch = (password === 'admin123' && user.role === 'admin') || 
     (password === 'user123' && user.role === 'customer'); 
    
    if (!isMatch) {
        throw new SweetServiceError('Invalid email or password.', 401);
    }

    // 2. Generating token
    const token = generateToken(user);
    return { token, user };
};