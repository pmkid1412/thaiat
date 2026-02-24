import { env } from './env.config';

const allowedOrigins = (env.APP.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim());

export const corsConfig = {
  origin: allowedOrigins,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
