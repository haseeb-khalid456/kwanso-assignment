/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Logger, ValidationPipe } from '@nestjs/common'; // import built-in ValidationPipe
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppConsts } from "./common/constants/app.const";
import * as morgan from 'morgan';
import { morganConfig } from "./common/constants/morgan-logger-config";

declare const module: any;
const configService = new ConfigService();
const logger = new Logger(bootstrap.name);

async function bootstrap() {
  if (module.hot) {
    logger.log({ message: 'Hot Reload in Use' });
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  //Morgan Request Logger Settings..
  morgan.token('body', (req, res) => JSON.stringify(req.body));

  const app = await NestFactory.create(AppModule);
  app.use(morgan(morganConfig));

  app.setGlobalPrefix(AppConsts.globalPrefix).useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );
  app.enableCors();
  app.enableVersioning();
  app.useGlobalInterceptors();
  app.use(cookieParser()); // For Cookies
  app.use(
    // for Session
    session({
      secret: 'ims-secret-session',
      resave: false,
      saveUninitialized: false,
    }),
  );

  /**
   * swagger setup for documentation
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kwanso Assignment')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const appURI = `http://localhost:${configService.port}/${AppConsts.globalPrefix}/swagger`;
  const swaggerUrl = `${AppConsts.globalPrefix}/swagger`;

  SwaggerModule.setup(swaggerUrl, app, document, {
    customSiteTitle: 'Kwanso Assignment',
    swaggerOptions: { defaultModelsExpandDepth: -1 }
  });
  logger.log({ message: `Listening to Rest APIs at ${appURI} 🚀` });
  await app.listen(process.env.PORT || configService.port, '0.0.0.0');

}

bootstrap();
