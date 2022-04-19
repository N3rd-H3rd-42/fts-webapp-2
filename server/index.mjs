import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/apply', (req, res) => res.render('apply'));
router.get('/register', (req, res) => res.render('register'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/dashboard', (req, res) => res.render('dashboard'));

export default router;
