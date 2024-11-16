const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const loginRoute = require('./routes/login.route');
const adminLoginRoute = require('./routes/adminLogin.route');
const signupRoute = require('./routes/signup.route');
const adminSignupRoute = require('./routes/adminsignup.route');
const addBranchRoute = require('./routes/addBranch.route')
const fetchUserRoute = require('./routes/fetchUser.route');
const fetchBranchRoute = require('./routes/fetchBranch.route')
const deleteUserRoute = require('./routes/deleteUser.route');
const deleteBranchRoute = require('./routes/deleteBranch.route')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use('/api/login', loginRoute);
app.use('/api/adminLogin', adminLoginRoute);
app.use('/api/adminSignup', adminSignupRoute);
app.use('/api/signup', signupRoute);
app.use('/api/addBranch', addBranchRoute);
app.use('/api/fetchUser', fetchUserRoute);
app.use('/api/fetchBranch', fetchBranchRoute);
app.use('/api/deleteUser', deleteUserRoute);
app.use('/api/deleteBranch', deleteBranchRoute);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));