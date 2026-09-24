import { User } from '../models/User.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role = 'citizen', phone = '', location = '' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const { connected } = getDbStatus();

    if (connected) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }
      const user = await User.create({ name, email, password, role, phone, location });
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }

    // In-Memory store fallback
    const exists = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    const newUser = {
      _id: 'user_' + Date.now(),
      name,
      email,
      password,
      role,
      phone,
      location
    };
    store.users.push(newUser);
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const { connected } = getDbStatus();

    let user = null;
    if (connected) {
      user = await User.findOne({ email });
    } else {
      user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        location: user.location || ''
      },
      token: 'jwt_mock_' + (user._id || Date.now())
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
