import { Module } from '@nestjs/common';
import { PermissionService } from './application/permission.service';
import { PermissionController } from './infrastructure/http/permission.controller';
import { PermissionRepositoryPort } from './domain/permission.repository.port';
import { PermissionRepository } from './infrastructure/persistence/permission.repository';

@Module({
  providers: [
    PermissionService,
    {
      provide: PermissionRepositoryPort,
      useClass: PermissionRepository,
    },
  ],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
