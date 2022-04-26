import express from 'express';
import passport from 'passport';
import {
  checkAuthenticated,
  checkIsNotAuthenticated,
} from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', (request, response) => response.render('home'));
router.get('/about', (request, response) => response.render('about'));
router.get('/apply', (request, response) => response.render('apply'));
router.get('/contact', (request, response) => response.render('contact'));

router
  .route('/login')
  .get((request, response) => response.render('login', { message: null }))
  .post(
    checkIsNotAuthenticated,
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

router
  .route('/dashboard')
  .get(checkAuthenticated, (request, response) =>
    response.render('dashboard', { user: request.user })
  );

router.route('/logout').delete((request, response) => {
  request.logOut();
  return response.render('login', { message: 'Successfully logged out' });
});

export default router;
