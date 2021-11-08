import '@babel/polyfill';
import React, { useRef, useEffect, useState } from "react";
import { fetchData, useEventListener } from '../App/utils';
import { animate, init, onDocumentMouseMove, onWindowResize } from './utils';
import { initAudio } from '../VideoController/audioHooks';
import styles from '../utils/loader.scss';

const Player: React.FC = () => {
  const videoElement = useRef(null);
  const containerElement = useRef(null);
  const audioElement = useRef(null);
  const [mediaActive, startMedia] = useState(false);

  useEventListener("mousemove", onDocumentMouseMove);
  useEventListener("resize", onWindowResize);

  const setMediaSrc = async () => {
    const audioSrc = await fetchData('/media/fandangos.mp3');
    const videoSrc = await fetchData('/media/fandangos_2.mp4');
    audioElement.current.src = audioSrc;
    videoElement.current.src = videoSrc;
    startMedia(true);
  }

  useEffect(() => {
    setMediaSrc();
    init(containerElement, videoElement)
    animate();
    initAudio(audioElement.current);
    audioElement.current.play();
  }, [])

  return (
    <div>
      {!mediaActive && <div className={styles.loader}>Loading...</div>}
      <audio ref={audioElement} />
      <video ref={videoElement} loop muted crossOrigin="anonymous" playsInline style={{ display: 'none'}} />
      <div ref={containerElement} />
    </div>
  )
}
export default Player;
