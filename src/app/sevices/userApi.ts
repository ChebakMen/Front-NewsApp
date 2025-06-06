import { api } from "./api";
import {User} from '../types'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login:builder.mutation<
      {token: string},
      {email: string; password: string}
    >({
      query: (userData) => ({
        url:'/login',
        method: "POST",
        body: userData
      })
    }),
    register: builder.mutation<
      {email: string; password: string; name: string},
      {email: string; password: string; name: string}
    >({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData
      })
    }),
    current: builder.query<User, void>({
      query:() => ({
        url: '/current',
        method: 'GET',
      })
    })
  })
})
//Изучить

export const  {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery
} = userApi

export const {
  endpoints:{login,register,current}
} = userApi

