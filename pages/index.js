import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Headlines() {
  const { data, error } = useSwr("/api/headlines", fetcher);

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
          <input className={styles.inputBar} placeholder="Search News" />
        </div>
        <div className={styles.grid}>
          <Headlines />
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
