import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyHttpDto } from './create-company.dto';

export class UpdateCompanyHttpDto extends PartialType(CreateCompanyHttpDto) {}
