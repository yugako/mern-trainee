const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Incorrect mail').isEmail(),
		check('password', 'Incorrect password. Min 6 symbols').isLength({min: 6}),
	], 
	async (req, res) => {
		try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect data during registration'
			});
		}

		const {email, password} = req.body;

		const candidate = await User.findOne({email});

		if (candidate) {
			return res.status(400).json({message: 'User already exsists'});
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({email, password: hashedPassword});

		await user.save();

		res.status(201).json({message: 'User created'});



		} catch(e) {
			res.status(500).json({message: 'Smt went wrong! Try again.'})
		}
});

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Incorrect mail').normalizeEmail().isEmail(),
		check('password', 'Incorrect password. Min 6 symbols').exists()
	],  
	async (req, res) => {
		try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect data during login'
			});
		}

		const {email, password} = req.body;

		const user = await User.findOne({email});

		if (!user) {
			return res.status(400).json({message: 'User not found'});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({message: 'Incorrect password. Try again'})
		}

		const token = jwt.sign(
			{userId: user.id},
			config.get('jwtSecret'),
			{expiresIn: '1h'}
		);

		res.json({token, userId: user.id});

		
		} catch(e) {
			res.status(500).json({message: 'Smt went wrong! Try again.'})
		}	
})

module.exports = router;