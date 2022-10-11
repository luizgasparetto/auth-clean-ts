import 'reflect-metadata';

import 'dotenv/config';
import cors from 'cors';

import express from "express";

import '../container';

import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

export { app };