import rateLimit from 'express-rate-limit';

// limit for signup (registration)
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 signup requests per hour
  message: { error: 'Too many signup attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// limit for login (stricter)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per 15 minutes
  message: { error: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
