'use client'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    </AppRouterCacheProvider>
  )
}
