// Lib
const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { configure_associations } = require('./src/models/associations.js')

// DB
configure_associations();

// Middleware configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Routers
app.use('/api/auth', require('./src/routes/authRouter.js'));
app.use('/api/projects', require('./src/routes/projectRouter.js'));
app.use('/api/projects', require('./src/routes/taskRouter.js'));
app.use('/api/invites', require('./src/routes/inviteRouter.js'));

app.listen(process.env.PORT, () => console.log("Server is listening on port " + process.env.PORT));