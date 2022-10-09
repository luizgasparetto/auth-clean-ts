import 'reflect-metadata';
import 'express-async-errors'

import 'dotenv/config';
import cors from 'cors';

import express from "express";

import { router } from './core/shared/routes';
import { AppError } from './core/shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(AppError.handler);

app.listen(process.env.HTTP_PORT, () => console.log("Server is running..."));