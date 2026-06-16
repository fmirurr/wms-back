import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from '../../application/permission.service';
import { CreatePermissionHttpDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findById(id);
  }

  @Post()
  create(@Body() dto: CreatePermissionHttpDto) {
    return this.permissionService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreatePermissionHttpDto) {
    return this.permissionService.update(id, dto);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.permissionService.deactivate(id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.permissionService.activate(id);
  }
}
