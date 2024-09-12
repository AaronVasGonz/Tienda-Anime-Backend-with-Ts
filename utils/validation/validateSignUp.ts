import { body } from 'express-validator';

const validateSignUp = [
    body('nombre')
        .isString()
        .withMessage('The name must be a string')
        .trim()
        .notEmpty()
        .withMessage('The name is required'),

    body('apellido')
        .isString()
        .withMessage('The last name must be a string')
        .trim()
        .notEmpty()
        .withMessage('The last name is required'),

    body('apellido2')
        .optional({ nullable: true })
        .isString()
        .withMessage('The second last name must be a string')
        .trim(),

    body("email")
        .isEmail()
        .withMessage('The email must be a valid email'),
    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage('The password must be between 8 and 16 characters')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^\s]).{8,16}$/)
        .withMessage('The password must contain at least one digit, one lowercase letter, one uppercase letter, and no spaces')
        .trim()

];

export { validateSignUp }