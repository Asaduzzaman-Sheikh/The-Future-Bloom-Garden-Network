import jwt from 'jsonwebtoken';

const jwtSecretKey=process.env.JWT_SECRET_KEY || "a03306dd0eb46c9af16ebd6690e4148a4d2eed217e36c96aaab2f4849a98caaf6fc9d50e01ed7f9d4801a5e20f89841113346e6c9f45e77385790aabfc770c3b";

const tokenVerification = (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log("Verified Token:",token);
        // If token is invalid..
        if(!token){
            return res.status(401).send({message: "Not a valid Token"})
        }
        const decodedToken = jwt.verify(token, jwtSecretKey);
        if(!decodedToken){
            return res.status(401).send({message: "Failed to Decode"})
        }
        req.userId= decodedToken.userId;
        req.role = decodedToken.role;
        next();
    } catch (error) {
        console.error("Hit error while verifying!", error);
        res.status(401).send({ message: 'Authentication failed!' });
    }
};

export default tokenVerification;