import { body, validationResult } from 'express-validator';

const validRegex = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).*$`;

const userValidators = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username should not be blank!')
        .isLength({ min: 3, max: 12 }).withMessage('Username must contain 3-12 characters!')
        .matches(validRegex).withMessage('Username must contain numbers, letters and special characters!')
        .escape(),

    body('email')
        .trim()
        .isEmail()
        .normalizeEmail().withMessage('Email is invalid!')
        .escape(),

    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must contain atleast 6 characters')
        .matches(validRegex).withMessage('Password must contain numbers, letters and special characters!')
        .escape()
];

const requestValidator = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.array().length !== 0) {
            const errorMessage = errors.array()[0].msg ? errors.array()[0].msg : '';
            return res.status(400).json({ message: `${errorMessage}` });
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

}

export {
    userValidators,
    requestValidator
}