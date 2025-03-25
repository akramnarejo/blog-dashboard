import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, User } from '../types'
import { BASE_URL } from '@/constants'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      // invalidatesTags: ['Posts'], 
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        try {
          const { data: createdPost } = await queryFulfilled
    
          // manually updating cache
          dispatch(
            blogApi.util.updateQueryData('getPosts', undefined, (draft) => {
              draft.unshift(createdPost)
            })
          )
        } catch (err) {
          console.error('Failed to update post cache', err)
        }
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useCreatePostMutation,
} = blogApi
