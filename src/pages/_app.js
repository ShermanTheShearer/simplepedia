/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { ThemeProvider , styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Head from "next/head";
import theme from "../material/theme";
import data from "../../data/seed.json";

const Footer = styled("footer")(({ theme: styledTheme }) => ({
  borderTop: "1px solid #eaeaea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: styledTheme.spacing(5),
  paddingTop: styledTheme.spacing(2),
}));

export default function MainApp(appProps) {
  const { Component, pageProps } = appProps;
  const [collection, setCollection] = useState(data);
  const router = useRouter();
  const { id } = router.query;

  const currentArticle = id
    ? collection.find((article) => +article.id === +id)
    : undefined;

  const setCurrentArticle = (article) => {
    if (article) {
      router.push(`/articles/${article.id}`);
    } else {
      router.push("/articles");
    }
  };

  const props = {
    ...pageProps,
    collection,
    setCollection,
    currentArticle,
    setCurrentArticle,
  };

  return (
    <AppCacheProvider {...appProps}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main>
          <Container>
            <Typography variant="h2" align="center">
              Simplepedia
            </Typography>
            <Component {...props} />
          </Container>
        </main>

        <Footer>CS 312 Practical: CSS Frameworks</Footer>
      </ThemeProvider>
    </AppCacheProvider>
  );
}

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
