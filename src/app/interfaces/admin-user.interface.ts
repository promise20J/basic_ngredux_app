export interface AdminUserInterface {
  email: string;
  password: string;
  code?: string;
  token?: string;
}

export interface AdminLogUserInterface {
  email: string;
  password: string;
}
