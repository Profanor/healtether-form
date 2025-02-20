import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../utils/password';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const register = async (req: Request, res: Response): Promise<void> => {
  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    // check password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.render('login', {
        title: 'Login',
        error: 'Invalid credentials',
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
