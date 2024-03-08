import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class ApiController {
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtectedResource(@Request() req) {
    return { message: 'Contenu protégé', user: req.user };
  }
}
