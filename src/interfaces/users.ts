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

export interface userAdress {
  adress: string,
  city: string,
  district: string,
  state: string,
}

export interface userCard {
  cardNumber: string,
  cardName: string,
  cardValidity: string,
  cpf: string,
}
