import React from 'react';
import styles from './index.scss';

const Header: React.FC = () => {
//   const socket = new WebSocket('ws://localhost:8080');
//   const sendMessage = () => {
//     console.log('test');
//     socket.send('Hello From Client!');
// }
  const title = 'Syntia';

  return (
    <div className={styles.header}>
      <a className={styles.title} href="https://syntia.org" target="_blank">
        {title}
      </a>
    </div>
  )};
export default Header;
