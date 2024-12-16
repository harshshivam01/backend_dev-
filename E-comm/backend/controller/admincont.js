const Admin = require('../models/adminModel');
const {getToken ,verifyToken} = require('../utils/auth');

const register=((req,res)=>{
    const [fullName,username,email, password] = req.body;
    Admin.create({fullName, username, email, password}).then((user)=>{
        res.status(201).json({
            user,
            status: 'success',
            message: 'User registered successfully'

        }).catch((error)=>{
            console.error('Error registering user:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to register user',
                error
            });
        });

    })

    }

    const loginAdmin = (req, res) => {
        

    }


    

