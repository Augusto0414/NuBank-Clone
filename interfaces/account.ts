export interface Profile {
  numero_documento: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
}

export interface Account {
  id: string;
  balance: number;
  profiles: Profile;
}
