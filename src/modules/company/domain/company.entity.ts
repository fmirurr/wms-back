export class CompanyEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public rut: string,
    public email: string,
    public address: string,
    public active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
