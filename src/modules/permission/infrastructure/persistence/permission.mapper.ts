import { InferSelectModel } from 'drizzle-orm';
import { permissions } from 'src/database/schema/permission.schema';
import { PermissionEntity } from '../../domain/permission.entity';

type PermissionRecord = InferSelectModel<typeof permissions>;

export class PermissionMapper {
  static toDomain(raw: PermissionRecord): PermissionEntity {
    return new PermissionEntity(
      raw.id,
      raw.name,
      raw.description,
      raw.active,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
