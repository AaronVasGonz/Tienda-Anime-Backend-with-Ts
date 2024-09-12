
import {body} from "express-validator";
const validateUser = [
    body('nombre', 'The name is required').not().isEmpty(),
    body('apellido', 'The last name is required').not().isEmpty(),
    body('apellido2')
        .optional({ nullable: true })
        .isString()
        .withMessage('The second last name must be a string')
        .trim(),
    body('email', 'Email no válido').isEmail(),
    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage('The password must be between 8 and 16 characters')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^\s]).{8,16}$/)
        .withMessage('The password must contain at least one digit, one lowercase letter, one uppercase letter, and no spaces').trim()
];

export  { validateUser };
