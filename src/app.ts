require('dotenv').config();
import express from 'express';

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const mongoPass = 'QG26uJQnUAZL1n2G';

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// import routes 

const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');

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

app.get('/', (req, res) => {
  res.send('Hello, Oof!');
});

/* USER ROUTES */

// get users 
app.get('/users', userRoutes.getAllUsers);
// add user
app.post('/users', userRoutes.addUser);
// get user by id
app.get('/users/:id', userRoutes.getUserById)
// update user
app.patch('/users/:id', userRoutes.updateUserById);
// delete user
app.delete('/users/:id', userRoutes.deleteUserById);

/* MENU ROUTES */

// get all menus
app.get('/menus', menuRoutes.GetAllMenus);
// add menu 
app.post('/menus', menuRoutes.AddMenu);
// get menu by id
app.get('/menus/:id', menuRoutes.getMenuById);
// update menu by id
app.patch('/menus/:id', menuRoutes.updateMenuById);
// delete menu
app.delete('/menus/:id', menuRoutes.deleteMenuById);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
