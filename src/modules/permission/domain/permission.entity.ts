export class PermissionEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
