import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

const jwtSecretKey=process.env.JWT_SECRET_KEY || "a03306dd0eb46c9af16ebd6690e4148a4d2eed217e36c96aaab2f4849a98caaf6fc9d50e01ed7f9d4801a5e20f89841113346e6c9f45e77385790aabfc770c3b";

const tokenGeneration = async (userId) => {
    try {
        const user = await User.findById(userId)

        // If no user found...
        if(!user){
            throw new Error("User not found!")
        }

        const token = jwt.sign({ userId: user._id, role:user.role }, jwtSecretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};

export default tokenGeneration;