import 'reflect-metadata';
import 'express-async-errors'

import 'dotenv/config';
import cors from 'cors';

import express from "express";

import '../container';

import { router } from './routes';
import { AppError } from '../../shared/errors/i-app-error';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

export { app };