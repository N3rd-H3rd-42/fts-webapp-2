import express from 'express';
// import console from 'console';

const router = express.Router();

router.route('/client').post((request, response) => {
  return response.redirect('dashboard', { user: request.user });
});

export default router;
