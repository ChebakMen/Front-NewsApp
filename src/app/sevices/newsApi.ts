import { News } from "../types";
import { api } from "./api";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation<News, {newsData:FormData, id: string}>({
      query:({newsData, id}) => ({
        url:`/news/${id}`,
        method: "PUT",
        body: newsData
      })
    }),
    createNews: builder.mutation<News, FormData>({
      query:(newsData) => ({
        url: '/news',
        method: "POST",
        body: newsData,
      })
    }),
    deleteNews: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/news/${id}`,
        method: 'DELETE'
      }),
    }),
    getAllNews: builder.query<News[], void>({
      query:() => ({
        url: '/news',
        method: "GET"
      })
    }),
    publishNews: builder.mutation<void,{id:string, newsData?: FormData}>({
      query: ({newsData,id}) => ({
        url: `/news/published/${id}`,
        method: 'PUT',
        body: newsData
      })
    }),
    getAllPublished:builder.query<News[], void>({
      query:() => ({
        url:'/news/published',
        method: "GET",
      })
    }),
    getNewsById: builder.query<News, {id: string}>({
      query:({id}) => ({
        url:`/news/${id}`,
        method: "GET"
      })
    }),
    // addImage: builder.mutation<{ fileUrl: string, imageUrl:string }, {newsData:FormData} >({
    //   query:({newsData}) => ({
    //     url:`/upload`,
    //     method: "POST",
    //     body: newsData
    //   })
    // })
  })
})

export const {
  useGetAllNewsQuery,
  useUpdateMutation,
  useGetAllPublishedQuery,
  useCreateNewsMutation,
  useLazyGetAllNewsQuery,
  useDeleteNewsMutation,
  usePublishNewsMutation,
  useGetNewsByIdQuery,
} = newsApi

export const {
  endpoints:{update,createNews, deleteNews, publishNews, getAllNews, getAllPublished, getNewsById}
} = newsApi