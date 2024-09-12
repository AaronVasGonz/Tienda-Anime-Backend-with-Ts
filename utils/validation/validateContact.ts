import { body } from 'express-validator';
const validateContact =
    [

        body('name').isLength({ min: 3 }).trim().withMessage('Name must be at least 3 characters long'),
        body('subject').isLength({ min: 5 }).trim().withMessage('Subject must be at least 5 characters long'),
        body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
        body('message').isLength({ min: 10 }).trim().withMessage('Message must be at least 10 characters long'),
    ]

export { validateContact }