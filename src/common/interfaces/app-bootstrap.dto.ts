import { SwaggerDocumentOptions } from '@nestjs/swagger';

export interface AppSwaggerSettings {
  title: string;
  description: string;
  swaggerDocumentOptions?: SwaggerDocumentOptions;
  urlPrefix?: string;
}