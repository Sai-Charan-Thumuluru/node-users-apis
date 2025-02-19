import { body, validationResult } from 'express-validator';

const validRegex = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).*$`;

const userValidators = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required!')
        .bail()
        .isLength({ min: 3, max: 12 }).matches(validRegex).withMessage('Username must contain 3-12 characters, numbers, letters and special characters!')
        .escape(),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required!')
        .bail()
        .isEmail()
        .normalizeEmail().withMessage('Email is invalid!')
        .escape(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required!')
        .bail()
        .isLength({ min: 6 }).matches(validRegex).withMessage('Password must contain atleast 6 characters, numbers, letters and special characters!')
        .escape()
];

const requestValidator = (req, res, next) => {
    try {
        const errors = validationResult(req).array()
            .filter((error) => error.msg !== "Invalid value");

        const errorResponse = {};
        errorResponse.message = `Request validation failed.`;
        errorResponse.validationErrors = errors.map((error) => {
            return {
                fieldName: error.path,
                message: `Invalid input '${error.value}'`,
                error: error.msg
            }
        });

        if (errors.length !== 0) {
            return res.status(400).json(errorResponse);
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