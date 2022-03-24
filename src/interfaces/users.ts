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

export interface UserAdress {
  adress: string,
  city: string,
  district: string,
  state: string,
}

export interface UserCard {
  cardNumber: string,
  cardName: string,
  cardValidity: string,
  cpf: string,
}
