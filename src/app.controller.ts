import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {
  }

  @ApiTags('Status')
  @Get('healthcheck')
  @ApiOperation({ summary: 'Get service status' })
  getData(): { status: string } {
    return this.appService.getStatus();
  }
}
