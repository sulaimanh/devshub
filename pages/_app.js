import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  ReactQueryCacheProvider
} from "react-query";
import { darkTheme, lightTheme } from "../styles/Themes";

import GlobalStyle from "../styles/GlobalStyle";
import { Hydrate } from "react-query/hydration";
import Layout from "@/components/Layout/Layout";
import { ProvideAuth } from "../utils/hooks/useAuth";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
// import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function MyApp({ Component, pageProps }) {
  const { value, toggle } = useDarkMode(false);
  const theme = value ? darkTheme : lightTheme;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Hydrate state={pageProps.dehydratedState}>
          <ProvideAuth>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Layout toggle={toggle}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ProvideAuth>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
