const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRoute = require('./routes/login.route');
const adminLoginRoute = require('./routes/adminLogin.route');
const signupRoute = require('./routes/signup.route');
const adminSignupRoute = require('./routes/adminsignup.route');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoute);
app.use('/api/adminLogin', adminLoginRoute);
app.use('/api/adminSignup', adminSignupRoute);
app.use('/api/signup', signupRoute);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));