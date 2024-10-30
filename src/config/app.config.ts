import { registerAs } from '@nestjs/config';

type AppConfigOptions = {
  globalPrefix: string;
  http: { port: number };
  versioning: { prefix: string; version: string };
};

export default registerAs(
  'app',
  (): AppConfigOptions => ({
    globalPrefix: '/api',
    http: {
      port: Number.parseInt(process.env.PORT, 10),
    },
    versioning: {
      prefix: 'v',
      version: '1',
    },
  }),
);
