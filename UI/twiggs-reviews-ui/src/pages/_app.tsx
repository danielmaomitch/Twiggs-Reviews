import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "@/themes/darkTheme";
import lightTheme from "@/themes/lightTheme";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme,
      }),
    [mode]
  );

  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
      >
        <SessionProvider session={session}>
          <CssBaseline />
          <div className={notoSans.className}>
            <Header />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
