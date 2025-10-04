import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5500;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    await app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
