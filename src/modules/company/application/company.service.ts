import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepositoryPort } from '../domain/company.repository.port';
import { CompanyEntity } from '../domain/company.entity';
import { CreateCompanyDto } from '../domain/dto/create-company.dto';
import { UpdateCompanyDto } from '../domain/dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepo: CompanyRepositoryPort) {}

  findAll(): Promise<CompanyEntity[]> {
    return this.companyRepo.findAll();
  }

  async findById(id: string): Promise<CompanyEntity> {
    const company = await this.companyRepo.findById(id);
    if (!company)
      throw new NotFoundException(`Company with id ${id} not found`);
    return company;
  }

  create(data: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companyRepo.create(data);
  }

  async update(id: string, data: UpdateCompanyDto) {
    await this.findById(id);
    return this.companyRepo.update(id, data);
  }

  async deactivate(id: string): Promise<CompanyEntity> {
    const company = await this.findById(id);
    if (!company.active)
      throw new ConflictException(
        `Company with id ${id} is already deactivated`,
      );
    return this.companyRepo.deactivate(id);
  }

  async activate(id: string): Promise<CompanyEntity> {
    const company = await this.findById(id);
    if (company.active)
      throw new ConflictException(`Company with id ${id} is already activated`);
    return this.companyRepo.activate(id);
  }
}
