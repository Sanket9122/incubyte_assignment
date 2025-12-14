const authService = require('../services/authservice');

/**
 * Handles POST /api/auth/register
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    
    const { token, user } = await authService.register(email, password);
    
    res.status(201).json({ 
      message: 'Registration successful.', 
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error); 
  }
};

/**
 * Handles POST /api/auth/login
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    
    const { token, user } = await authService.login(email, password);
    
    res.status(200).json({ 
      message: 'Login successful.', 
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};