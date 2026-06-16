import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionHttpDto } from './create-permission.dto';

export class UpdatePermissionHttpDto extends PartialType(
  CreatePermissionHttpDto,
) {}
