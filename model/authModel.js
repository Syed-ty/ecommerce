const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    fullname: {
        type: 'string',
    },
    email: {
        type: 'string',
        unique: true,
    },
    password: {
        type: 'string',
    },
    role: {
        type: 'string',
    }
})

const LoginSchema = new Schema({
    email: {
        type: 'string',
    },
    password: {
        type: 'string',
    },
})







const Register = mongoose.model('register',RegisterSchema);
const Login = mongoose.model('login',LoginSchema);

module.exports = {Register,Login}