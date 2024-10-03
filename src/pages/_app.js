/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import data from "../../data/seed.json";
import styles from "../styles/Simplepedia.module.css";

const router = useRouter();

function MainApp({ Component, pageProps }) {
  const [collection, setCollection] = useState(data);
  const {id} = router.query;

  const props = {
    ...pageProps,
    collection,
    setCollection,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Simplepedia</h1>
        <Component {...props} />
      </main>

      <footer>CS 312 Assignment 3</footer>
    </div>
  );
}

export default MainApp;

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
