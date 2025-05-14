
import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKENSECRETKEY;

export const generateToken = (payloadData) => {

    let token = jwt.sign({ payload: payloadData }, secretKey, { expiresIn: "3d" });

    return token;
}


export const verifyToken = (token) => {
    try {
        let response = jwt.verify(token, secretKey);

        return response ? { message: 'success', result: response.payload } : { message: 'Invalid token' };

    } catch (error) {
        return { message: error.message };
    }
}