export interface NewUser {
  email: string,
  name: string,
  lastName: string,
  hash: string,
  cpf?: string,
}

export interface UserType {
  token?: string,
  hash?: string
}
