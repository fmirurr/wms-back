import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './permission.entity';

export abstract class PermissionRepositoryPort {
  abstract findAll(): Promise<PermissionEntity[]>;
  abstract findById(id: string): Promise<PermissionEntity | null>;
  abstract create(data: CreatePermissionDto): Promise<PermissionEntity>;
  abstract update(
    id: string,
    data: UpdatePermissionDto,
  ): Promise<PermissionEntity>;
  abstract deactivate(id: string): Promise<PermissionEntity>;
  abstract activate(id: string): Promise<PermissionEntity>;
}
