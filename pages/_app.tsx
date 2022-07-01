import type { AppProps } from "next/app"
import CssBaseline from "@mui/material/CssBaseline"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"
import store from "@store/index"
import "../styles/index.css"
// import aws from '@lib/aws/aws-sdk';

const queryClient = new QueryClient()
const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
