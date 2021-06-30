import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

function Headlines({ data, error }) {
  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      {data.articles.map((article) => (
        <a href={article.url} target="_blank" className={styles.card}>
          <img
            src={article.urlToImage}
            alt="News image"
            className={styles.image}
          />
          <h3>{article.title} &rarr;</h3>
          <p>{article.description}</p>
        </a>
      ))}
    </>
  );
}

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const { data, error } = useSWR("api/headlines", fetcher);

  useEffect(() => {
    fetch("http://localhost:3000/api/headlines", { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error while gettin the data");
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/api/headlines", {
      method: "POST",
      body: JSON.stringify({ query: text }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error while gettin the data");
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // mutate("/api/headlines", [data, text], false);
    // mutate(
    //   "/api/headlines",
    //   { data, error },
    //   await fetch("/api/headlines", {
    //     method: "POST",
    //     body: JSON.stringify({ query: text }),
    //   }).then((res) => res.json())
    // );
    setText("");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>News Aggregator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <Link href="https://newsapi.org/">
            <a>News app!</a>
          </Link>
        </h1>

        <p className={styles.description}>
          Get started by searching{" "}
          <code className={styles.code}>Your country's news</code>
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputBar}
              type="text"
              onChange={(event) => setText(event.target.value)}
              value={text}
              placeholder="Search News"
            />
          </form>
        </div>
        <div className={styles.grid}>
          {!loading ? (
            <Headlines data={data} error={error} />
          ) : (
            <center>
              <div>loading...</div>
            </center>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img
            src="/newsAPILogo.png"
            alt="newsapi Logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  );
}
