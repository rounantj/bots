export interface ITeste_old {
  name: string
  email: string
  phoneNumber: string
}
export interface IConversation_old {
  isAttendant: boolean
  message: string
  data: Date
}
export interface IRequestConversation_old {
  text: string
  token: string
}
export interface IRequestQueue_old {
  text: string
  token: string
}
export interface IResponseConversation_old {
  name: string
  picture: string
  conversation: IConversation_old[]
}
export interface IFirstRequest {
  id: number
  name: string
  status: string
  picture: string
  category: string
  conversation: []
}
