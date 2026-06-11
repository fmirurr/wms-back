import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

export abstract class CompanyRepositoryPort {
  abstract findAll(): Promise<CompanyEntity[]>;
  abstract findById(id: string): Promise<CompanyEntity | null>;
  abstract create(data: CreateCompanyDto): Promise<CompanyEntity>;
  abstract update(id: string, data: UpdateCompanyDto): Promise<CompanyEntity>;
  abstract deactivate(id: string): Promise<CompanyEntity>;
  abstract activate(id: string): Promise<CompanyEntity>;
}
