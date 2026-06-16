import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepositoryPort } from '../../domain/permission.repository.port';
import { DRIZZLE } from 'src/database/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as permissionSchema from 'src/database/schema/permission.schema';
import { PermissionEntity } from '../../domain/permission.entity';
import { PermissionMapper } from './permission.mapper';
import { eq } from 'drizzle-orm';
import { CreatePermissionDto } from '../../domain/dto/create-permission.dto';
import { UpdatePermissionDto } from '../../domain/dto/update-permission.dto';

@Injectable()
export class PermissionRepository implements PermissionRepositoryPort {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof permissionSchema>,
  ) {}

  async findAll(): Promise<PermissionEntity[]> {
    const rows = await this.db.select().from(permissionSchema.permissions);
    return rows.map((row) => PermissionMapper.toDomain(row));
  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const [row] = await this.db
      .select()
      .from(permissionSchema.permissions)
      .where(eq(permissionSchema.permissions.id, id));
    return row ? PermissionMapper.toDomain(row) : null;
  }

  async create(data: CreatePermissionDto): Promise<PermissionEntity> {
    const [row] = await this.db
      .insert(permissionSchema.permissions)
      .values(data)
      .returning();
    return PermissionMapper.toDomain(row);
  }

  async update(
    id: string,
    data: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    const [row] = await this.db
      .update(permissionSchema.permissions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(permissionSchema.permissions.id, id))
      .returning();
    return PermissionMapper.toDomain(row);
  }

  async deactivate(id: string): Promise<PermissionEntity> {
    return this.setActivate(id, false);
  }

  async activate(id: string): Promise<PermissionEntity> {
    return this.setActivate(id, true);
  }

  private async setActivate(
    id: string,
    isActive: boolean,
  ): Promise<PermissionEntity> {
    const [row] = await this.db
      .update(permissionSchema.permissions)
      .set({ active: isActive, updatedAt: new Date() })
      .where(eq(permissionSchema.permissions.id, id))
      .returning();
    return PermissionMapper.toDomain(row);
  }
}
