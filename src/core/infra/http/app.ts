import 'reflect-metadata';

import 'dotenv/config';
import cors from 'cors';

import express from "express";

import { router } from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../../docs/swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

export { app };