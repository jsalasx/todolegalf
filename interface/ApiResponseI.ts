export interface ApiResponseI<T>{
  error: boolean
  errorMsg: string[]
  data: T
}

export interface ApiResponseTokenExpiredI {
  detail: string
  code: string
  messages: Message[]
}

export interface Message {
  token_class: string
  token_type: string
  message: string
}
