import jwt from 'jsonwebtoken';

const verifyUser = async (token: string) => {
    const secret = process.env.SECRET;
    
    if (!secret) {
        throw new Error('Secret key is not defined');
    }

    const decoded = await jwt.verify(token, secret);

    return decoded;
}

export { verifyUser };