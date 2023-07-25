export interface UserModel {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone?: string;
  date_of_birth?: Date;
  status: number;
  has_changed_password: number;
  role: number;
  created_at: Date;
  last_updated: Date;
}
