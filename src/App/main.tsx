import '@babel/polyfill';
import React, { useEffect } from "react";

import Header from '../Header';
import styles from './styles.scss';
import data from './projects.json';
import webglPreview from './webgl.jpg';
import echoPreview from './echo.jpg';

const Main: React.FC = () => {
  const title = 'Projects:';
  const images = {
    'webgl': webglPreview,
    'echo': echoPreview,
  };

  useEffect(() => {
    const renderer = document.getElementsByClassName('dg ac');
    if (renderer.length) {
      window.location.reload();
    }
  }, [])

  const items = data.projects.map((article, i) => {
    return (
      <div className={styles.article} key={article.name + i}>
        <a href={article.url}>{article.name}
        <img src={images[article.preview]} />
        <p>{article.description}</p>
        <p>{article.technology}</p>
        </a>
      </div>
    )
  });

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.container}>
        <p className={styles.title}>{title}</p>
        {items}
      </div>
    </div>
  )
}
export default Main;