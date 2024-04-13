export interface UserI {
  id: number
  username: string
  email: string
}
export interface LoginI {
    email: string,
    password: string
}
export interface AccessTokenRequestI{
    username: string,
    password: string
}

export interface BearerTokenI {
    refresh : string,
    access : string
}