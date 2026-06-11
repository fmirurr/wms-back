import { InferSelectModel } from 'drizzle-orm';
import { CompanyEntity } from '../../domain/company.entity';
import { companies } from 'src/database/schema/company.schema';

type CompanyRecord = InferSelectModel<typeof companies>;

export class CompanyMapper {
  static toDomain(raw: CompanyRecord): CompanyEntity {
    return new CompanyEntity(
      raw.id,
      raw.name,
      raw.rut,
      raw.email,
      raw.address,
      raw.active,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
