import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PermissionRepositoryPort } from '../domain/permission.repository.port';
import { PermissionEntity } from '../domain/permission.entity';
import { CreatePermissionDto } from '../domain/dto/create-permission.dto';
import { UpdatePermissionDto } from '../domain/dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepositoryPort) {}

  findAll(): Promise<PermissionEntity[]> {
    return this.permissionRepo.findAll();
  }

  async findById(id: string): Promise<PermissionEntity> {
    const permission = await this.permissionRepo.findById(id);
    if (!permission) {
      throw new NotFoundException(`Permission whit id ${id} not found`);
    }
    return permission;
  }

  create(data: CreatePermissionDto): Promise<PermissionEntity> {
    return this.permissionRepo.create(data);
  }

  async update(id: string, data: UpdatePermissionDto) {
    await this.findById(id);
    return this.permissionRepo.update(id, data);
  }

  async deactivate(id: string): Promise<PermissionEntity> {
    const permission = await this.findById(id);
    if (!permission.active) {
      throw new ConflictException(
        `Permission with id ${id} is already deactivated`,
      );
    }
    return this.permissionRepo.deactivate(id);
  }

  async activate(id: string): Promise<PermissionEntity> {
    const permission = await this.findById(id);
    if (permission.active) {
      throw new ConflictException(
        `Permission with id ${id} is already activated`,
      );
    }
    return this.permissionRepo.activate(id);
  }
}
