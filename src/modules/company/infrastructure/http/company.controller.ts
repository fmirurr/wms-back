import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from '../../application/company.service';
import { CreateCompanyHttpDto } from './dto/create-company.dto';
import { UpdateCompanyHttpDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateCompanyHttpDto) {
    return this.companyService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyHttpDto) {
    return this.companyService.update(id, dto);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.companyService.deactivate(id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.companyService.activate(id);
  }
}
