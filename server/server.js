const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRoute = require('./routes/login.route');
const signupRoute = require('./routes/signup.route');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));