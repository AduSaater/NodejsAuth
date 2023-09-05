const mongoose = require('mongoose');
const users = require('./routes/user');
const auth= require('./routes/auth');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./startup/db');
connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/login', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));