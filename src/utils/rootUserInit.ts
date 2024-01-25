const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

export const rootUserInit = async () => {
  try {
    const rootUser = await UserModel.findOne({ email: process.env.ROOT_USER_EMAIL });
    
    if (!rootUser) {

      const password = process.env.ROOT_USER_PASSWORD;
      
      bcrypt.genSalt(10, (err: Error, salt: string) => {
        if(err){
          console.log('Error generating salt');
        }

        bcrypt.hash(password, salt, async (hashErr: Error, hashedPassword: string) => {
          if (hashErr){
            console.log('Error hashing password')
          }
          const newRootUser = new UserModel({
            email: process.env.ROOT_USER_EMAIL,
            password: hashedPassword,
            firstName: process.env.ROOT_USER_FIRST_NAME,
            lastName: process.env.ROOT_USER_LAST_NAME,
            isAdmin: true,
          });
          await newRootUser.save();
          console.log('Root user created successfully');
        });
      });
    }
  } catch (error: any) {
    console.error('Error creating root user:', error.message);
  }
};