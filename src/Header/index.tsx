import React from 'react';
import styles from './index.scss';

const Header: React.FC = () => {
  const socket = new WebSocket('ws://localhost:8080');
  const sendMessage = () => {
    console.log('test');
    socket.send('Hello From Client!');
}

  return (
    <div className={styles.header}>
      <div onClick={sendMessage}>Ambisonics decoder</div>
    </div>
  )};
export default Header;
