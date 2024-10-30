import express, { json } from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

config();

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));