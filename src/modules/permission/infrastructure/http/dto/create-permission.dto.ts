import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionHttpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
