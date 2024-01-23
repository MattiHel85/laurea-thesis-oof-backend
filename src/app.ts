import dotenv from 'dotenv';
import express from 'express';
import './config/passport';
import passport from 'passport';

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const mongoPass = 'QG26uJQnUAZL1n2G';

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

// import controllers
const userControllers = require('./controllers/userControllers');
const menuControllers = require('./controllers/menuControllers');
const blogControllers = require('./controllers/blogControllers');
const authControllers = require('./controllers/authControllers');
const mailingListControllers = require('./controllers/mailingListControllers');


/*TEST NODEMAILER*/
// import { sendEmail } from './utils/emailSender';
// import { EmailTemplate } from './types/emailTemplate';

// const dummyRecipientEmails = ['matt.rc.simpson@gmail.com', 'matthew.rc.simpson@hotmail.com', 'matti.simpson@hotmail.fi'];
// const dummyTemplate: EmailTemplate = {
//   subject: 'THIS IS A TEST',
//   content: 'DO NOT BE AFRAID',
//   images: []
// };

// dummyRecipientEmails.forEach((email) => {
//   sendEmail(email, dummyTemplate);
// })

// sendEmail('Vickilou31@hotmail.co.uk', dummyTemplate)
/*TEST ENDS*/

const fs = require('fs');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();
// db connection address
const uri = `mongodb+srv://mattrcsimpson:${mongoPass}@cluster0.6lvmky3.mongodb.net/?retryWrites=true&w=majority`;
// connect to db
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;

database.on("error", (err: Error) => console.log(`Connection Error: ${err}`));
database.once("open", () => console.log("Welcome to the OOF database!"));

app.get('/api/v1/', (req, res) => {
  const filePath = path.join(__dirname, '/views/welcome.html');

  fs.readFile(filePath, 'utf-8', (err: any, data: any) => {
    if(err){
      return res.status(500).send('Error reading HTML file');
    }

    res.send(data);
  })
});


/* AUTH ROUTES */
app.post('/api/v1/login', authControllers.login);
app.get('/api/v1/profile', passport.authenticate('jwt', {session: false}), authControllers.getProfile);

/* USER ROUTES */
app.get('/api/v1/users', userControllers.getAllUsers);
app.post('/api/v1/users', userControllers.addUser);
app.get('/api/v1/users/:id', userControllers.getUserById);
app.patch('/api/v1/users/:id', userControllers.updateUserById);
app.delete('/api/v1/users/:id', userControllers.deleteUserById);

/* MENU ROUTES */
app.get('/api/v1/menus', menuControllers.getAllMenus);
app.post('/api/v1/menus', menuControllers.addMenu);
app.get('/api/v1/menus/:id', menuControllers.getMenuById);
app.patch('/api/v1/menus/:id', menuControllers.updateMenuById);
app.delete('/api/v1/menus/:id', menuControllers.deleteMenuById);


/* BLOG ROUTES*/
app.get('/api/v1/blogs', blogControllers.getAllBlogs);
app.post('/api/v1/blogs', blogControllers.addBlog);
app.get('/api/v1/blogs/:id', blogControllers.getBlogById);
app.patch('/api/v1/blogs/:id', blogControllers.updateBlogById);
app.delete('/api/v1/blogs/:id', blogControllers.deleteBlogById);

/* MAILING LIST ROUTES*/
app.get('/api/v1/mailing-lists', mailingListControllers.getAllMailingLists);
app.post('/api/v1/mailing-lists', mailingListControllers.addMailingList);
app.get('/api/v1/mailing-lists/:id', mailingListControllers.getMailingListById);
app.patch('/api/v1/mailing-lists/:id', mailingListControllers.updateMailingListById);
app.delete('/api/v1/mailing-lists/:id', mailingListControllers.deleteMailingListById);

/* SEND EMAIL TO MAILING LIST ROUTES*/
app.post('/api/v1/mailing-lists/:id', mailingListControllers.sendEmailToRecipients);

/* RECIPIENT ROUTES */
// app.get('/api/v1/mailing-lists/:id/recipients', mailingListControllers.getAllMailingLists);
// app.post('/api/v1/mailing-lists/:id/recipients', mailingListControllers.addMailingList);
// app.get('/api/v1/mailing-lists/:id/recipients/:recipientId', mailingListControllers.getMailingListById);
// app.patch('/api/v1/mailing-lists/:id/recipients/:recipientId', mailingListControllers.updateMailingListById);
// app.delete('/api/v1/mailing-lists/:id/recipients/:recipientId', mailingListControllers.deleteMailingListById);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/v1`);
});