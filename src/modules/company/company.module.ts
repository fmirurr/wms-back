import { Module } from '@nestjs/common';
import { CompanyService } from './application/company.service';
import { CompanyController } from './infrastructure/http/company.controller';
import { CompanyRepository } from './infrastructure/persistence/company.repository';
import { CompanyRepositoryPort } from './domain/company.repository.port';

@Module({
  providers: [
    CompanyService,
    { provide: CompanyRepositoryPort, useClass: CompanyRepository },
  ],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
