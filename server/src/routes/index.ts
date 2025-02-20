import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to HealTether forms');
});

export default router;
