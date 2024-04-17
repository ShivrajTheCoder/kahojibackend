const jwt = require('jsonwebtoken');
const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { adminLogin } = require("../db/AdminActions");

const jwtsecret = process.env.JWT_ADMIN_KEY;

const exp = module.exports;

exp.adminLogin = RouterAsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const admin = await adminLogin(email, password);
        if (!admin) {
            return res.status(401).json({
                message:"Admin not found!"
            });
        }

        // Create a JWT token
        const token = jwt.sign({ email: admin.email, isAdmin: true }, jwtsecret, { expiresIn: '5h' });

        // Return the token along with a success message
        return res.status(200).json({
            token,
            admin,
            message: "Admin login successful"
        });
    } catch (error) {
        next(error);
    }
});
