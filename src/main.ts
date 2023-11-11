import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: process.env.JWT_AIRBNB,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());

  app.use(passport.session());

  const port = process.env.PORT || 5001;
  await app.listen(port, () => {
    console.log(`Server is running on the port: ${port}`);
  });
}
bootstrap();
