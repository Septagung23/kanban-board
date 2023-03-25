export type FormRegister = {
  namaLengkap: string;
  username: string;
  password: string;
  nomorHp: string;
  divisi: string;
};

export type User = {
  id: string;
  namaLengkap: string;
  username: string;
  nomorHp: string;
  divisi: string;
  role: Role | null;
};

type Role = {
  id: number;
  nama: string;
};
