
const {Register,Login} = require('../model/authModel');

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')


const register = async (req, res, next)=>{
    try {
        const{
            fullname,
            password,
            email,
            role
        }=req.body;

        const user = await Register.findOne({
            email: email
        })

        if (!user) {
            const salt = bcryptjs.genSaltSync(10);
            console.log(salt,"salt");
            const encryptedPassword = bcryptjs.hashSync(password, salt)
            const newUser = await Register.insertMany({
                fullname,
                password:encryptedPassword,
                email,
                role
            })
            // const token = jwt.sign({
            //         _id: newUser.email
            //     },process.env.jwtSecret )
            res.status(200).json({
                error: false,
                // token: token,
                message:"User Registered Successfully",
                response: newUser
            })
        }else {
            res.status(400).json({
                error: false,
                message:"User already Exist ",
            })
        }
        
    }catch (err) {
                next(err.message)
            }
}



const login = async (req, res, next)=>{
    try {
        const{
            email,
            password
        }=req.body;

        const user = await Register.findOne({
            email: email
        })

        if (user) {
           if (bcryptjs.compareSync(password, user.password)) {
            const token = jwt.sign({
                _id: newUser.email
            }, process.env.jwtSecret);

            res.status(200).json({
                error: false,
                token:token,
                message:"User Login Successfully",
                response: newUser
            })
           }else{
            res.status(400).json({
                error: false,
                message:"Password is incorrect ",
            })
           }
        }else {
            res.status(400).json({
                error: false,
                message:"User Does not Exist ",
            })
        }
        
    }catch (err) {
                next(err.message)
            }
}


const getUserById = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const user = await Register.find({ _id:req.params.id});
        if (user) {
            console.log(user);
            res.status(200).json({
                error: false,
                message: 'user data fetched successfully',
                response: user
            })
        } else {
            console.log(productData);
            res.status(404).json({
                error: false,
                message: "No data found",
                
            })
        }
    } catch (err) {
        next(err.message)
    }
}


const getAllUserDetails = async (req, res, next) => {
    try {
        const user = await Register.find();
        if (user) {
            console.log(user);
            res.status(200).json({
                error: false,
                message: 'users data fetched successfully',
                response: user
            })
        } else {
            res.status(404).json({
                error: false,
                message: "No data found",
            })
        }
    } catch (err) {
        next(err.message)
    }
}


const UpdateUserDetails = async (req, res, next) => {
    try {
        const {
            fullname,
            password,
            email,
            role
        } = req.body;

        const salt = bcryptjs.genSaltSync(10);
        console.log(salt,"salt");
        const encryptedPassword = bcryptjs.hashSync(password, salt)
        const user = await Register.findByIdAndUpdate({
            _id: req.params.id
        }, {
            fullname: fullname,
            password:encryptedPassword,
            email:email,
            role: role
        },{new:true})
        
        res.status(200).json({
            error: false,
            message: "user details updated sucessfully",
            response: user
        })
    } catch (err) {
        next(err.message)
    }
}

const DeleteUserdDetails = async (req, res, next) => {
    try {

        const user = await Register.findByIdAndDelete({
            _id: req.params.id
        })
        
        res.status(200).json({
            error: false,
            message: "user details deleted sucessfully",
        })
    } catch (err) {
        next(err.message)
    }
}


module.exports={
    register,
    login,
    getUserById,
    getAllUserDetails,
    UpdateUserDetails,
    DeleteUserdDetails
}