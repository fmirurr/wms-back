import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepositoryPort } from '../../domain/company.repository.port';
import { DRIZZLE } from 'src/database/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as companySchema from 'src/database/schema/company.schema';
import { CompanyMapper } from './company.mapper';
import { eq } from 'drizzle-orm';
import { CompanyEntity } from '../../domain/company.entity';
import { CreateCompanyDto } from '../../domain/dto/create-company.dto';
import { UpdateCompanyDto } from '../../domain/dto/update-company.dto';

@Injectable()
export class CompanyRepository implements CompanyRepositoryPort {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof companySchema>,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    const rows = await this.db.select().from(companySchema.companies);
    return rows.map((row) => CompanyMapper.toDomain(row));
  }

  async findById(id: string): Promise<CompanyEntity | null> {
    const [row] = await this.db
      .select()
      .from(companySchema.companies)
      .where(eq(companySchema.companies.id, id));
    return row ? CompanyMapper.toDomain(row) : null;
  }

  async create(data: CreateCompanyDto): Promise<CompanyEntity> {
    const [row] = await this.db
      .insert(companySchema.companies)
      .values(data)
      .returning();
    return CompanyMapper.toDomain(row);
  }

  async update(id: string, data: UpdateCompanyDto): Promise<CompanyEntity> {
    const [row] = await this.db
      .update(companySchema.companies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(companySchema.companies.id, id))
      .returning();
    return CompanyMapper.toDomain(row);
  }

  async deactivate(id: string): Promise<CompanyEntity> {
    return this.setActive(id, false);
  }

  async activate(id: string): Promise<CompanyEntity> {
    return this.setActive(id, true);
  }

  private async setActive(
    id: string,
    isActive: boolean,
  ): Promise<CompanyEntity> {
    const [row] = await this.db
      .update(companySchema.companies)
      .set({ active: isActive, updatedAt: new Date() })
      .where(eq(companySchema.companies.id, id))
      .returning();
    return CompanyMapper.toDomain(row);
  }
}
