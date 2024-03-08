export class CreateUserDto {
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  role_admin: boolean;
  skills: string[];
}
