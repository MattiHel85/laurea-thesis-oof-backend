require('dotenv').config();
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

// import routes 
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const blogRoutes = require('./routes/blogRoutes');

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
  res.send('Hello, Oof!');
});

/* USER ROUTES */

// get users 
app.get('/api/v1/users', userRoutes.getAllUsers);
// add user
app.post('/api/v1/users', userRoutes.addUser);
// get user by id
app.get('/api/v1/users/:id', userRoutes.getUserById)
// update user
app.patch('/api/v1/users/:id', userRoutes.updateUserById);
// delete user
app.delete('/api/v1/users/:id', userRoutes.deleteUserById);

/* MENU ROUTES */

// get all menus
app.get('/api/v1/menus', menuRoutes.getAllMenus);
// add menu 
app.post('/api/v1/menus', menuRoutes.addMenu);
// get menu by id
app.get('/api/v1/menus/:id', menuRoutes.getMenuById);
// update menu by id
app.patch('/api/v1/menus/:id', menuRoutes.updateMenuById);
// delete menu
app.delete('/api/v1/menus/:id', menuRoutes.deleteMenuById);


/* BLOG ROUTES*/

// get all blogs
app.get('/api/v1/blogs', blogRoutes.getAllBlogs);
// add blog
app.post('/api/v1/blogs', blogRoutes.addBlog);
// get blog by id
app.get('/api/v1/blogs/:id', blogRoutes.getBlogById);
// update blog by id
app.patch('/api/v1/blogs/:id', blogRoutes.updateBlogById);
// delete blog by id
app.delete('/api/v1/blogs/:id', blogRoutes.deleteBlogById);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/v1`);
});
