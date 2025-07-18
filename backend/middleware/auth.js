import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again'})
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(token_decoded.id);
        if (!user) {
            return res.json({ success: false, message: 'User does not exist. Please login again.' });
        }
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;