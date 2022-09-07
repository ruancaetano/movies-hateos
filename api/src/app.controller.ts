import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  @ApiResponse({ status: 200, description: 'Healthy service' })
  status() {
    return this.appService.getAppStatus();
  }
}
