require('dotenv').config();
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

// get users 
const getAllUsers = async (req: any, res: any) => {
    const allUsers = await UserModel.find({});
    res.status(200).json(allUsers);
};

// fetch user by id
const getUserById = async (req: any, res: any) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
};

// add user
const addUser = async (req: any, res: any) => {
    const { firstName, lastName, email, password, adminCode } = req.body;

    let isAdmin: Boolean = false;
    
    adminCode === process.env.ADMIN_CODE ? isAdmin = true : isAdmin = false;

    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if(err){
            return res.status(500).json({error: 'Error generating salt'});
        }

        bcrypt.hash(password, salt, async (err: Error, hash: string) => {
            if(err){
                return res.status(500).json({ error: 'Error hashing password'});
            }
            try {
                const newUser = new UserModel({
                    firstName,
                    lastName,
                    email,
                    password: hash, 
                    isAdmin
                });
                await newUser.save();

                return res.status(200).json({ message: `Added user: ${newUser.firstName} ${newUser.lastName}`})
            } catch (error) {
                return res.status(500).json({ error: 'Error saving user.'})
            }
        })
    })
};

// update users by id 
const updateUserById = async (req: any, res: any) => {    
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${user.firstName} ${user.lastName}`);
};

// delete user by id
const deleteUserById = async (req: any, res: any) => {    
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted user: ${user.firstName} ${user.lastName}`);
};


export {
    getAllUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById
}