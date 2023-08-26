import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { SecurityService } from './security.service';
import { Security } from './security.entity';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get()
  async getSecurities(@Query('count') count: number): Promise<Security[]> {
    return this.securityService.findAllLimited(count);
  }

  @Get(':id')
  async getSecurityById(@Param('id') id: number): Promise<Security> {
    return this.securityService.findById(id);
  }

  @Post()
  async createSecurity(@Body() security: Security): Promise<Security> {
    return this.securityService.create(security);
  }
}
