import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchNewsData } from "@/lib/api/news"

interface NewsItem {
  title: string
  source: string
  url: string
  date: string
}

interface NewsState {
  data: NewsItem[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  return fetchNewsData()
})

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch news data"
      })
  },
})

export default newsSlice.reducer

