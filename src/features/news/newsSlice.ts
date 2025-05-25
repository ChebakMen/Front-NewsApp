import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { News } from "../../app/types";


interface NewsState {
  items: News[]
  status: 'loading' | 'error' | 'success'
}

const initialState: { news: NewsState } = {
  news: {
    items: [],
    status: 'loading'
  }
}



export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<News[]>) {
      state.news.items = action.payload
      state.news.status = 'success'
    },
    setLoading(state) {
      state.news.status = 'loading'
    },
    setError(state) {
      state.news.status = 'error'
    },
    clearNews(state) {
      state.news.items = []
    }
  },
})


export const { setNews,  clearNews } = newsSlice.actions


