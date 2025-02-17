import bcrypt from 'bcrypt';
import User from '../models/User.js';

const checkUser = async (key, value) => {
    let user;
    try {
        let queryFilter = {};
        queryFilter[key] = value;
        user = await User.findOne(queryFilter);
    } catch (error) {
        console.error(error);
    }
    return (user != null);
}

const signUp = async (req, res) => {
    try {
        let userName, email, password;
        userName = req.body ? req.body.username : null;
        email = req.body ? req.body.email : null;
        password = req.body ? req.body.password : null;
        const saltRounds = 10;

        if (await checkUser("username", userName)) {
            res.status(409).json({ message: `User already exists with username ${userName}` });
        } else if (await checkUser("email", email)) {
            res.status(409).json({ message: `User already exists with email ${email}` });
        } else {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassord = await bcrypt.hash(password, salt);
            const userObject = {
                username: userName,
                email: email,
                password: hashedPassord
            }
            const newUser = new User(userObject);
            const savedUser = await newUser.save();
            res.status(201).json({ message: `User created with id ${savedUser._id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error while registering user`, errorStack: error.stack });
    }
}

// const login = (req, res) => {
//     res.send(`You requested ${req.url} using ${req.method} method`);
// }

// const logout = (req, res) => {
//     res.send(`You requested ${req.url} using ${req.method} method`);
// }

// export {
//     signUp,
//     login,
//     logout
// }

export default signUp;