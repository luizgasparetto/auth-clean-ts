import 'reflect-metadata';
import 'express-async-errors'

import 'dotenv/config';
import cors from 'cors';

import express, { Request, Response, NextFunction } from "express";

import './core/container';

import { router } from './core/shared/routes';
import { AppError } from './core/shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(process.env.HTTP_PORT, () => console.log("Server is running..."));