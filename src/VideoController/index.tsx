import '@babel/polyfill';
import React, { useRef, useEffect, useState } from "react";
import useVideoPlayer from "./videoHooks";
import styles from './styles.scss';
import loaderStyles from '../utils/loader.scss';
import { fetchData, useEventListener } from '../App/utils';

const VideoController: React.FC = () => {
  const [mediaActive, startMedia] = useState(false);
  const videoElement = useRef(null);
  const audioElement = useRef(null);

    const {
      playerState,
      togglePlay,
      handleOnTimeUpdate,
      handleVideoProgress,
      handleKeys,
    } = useVideoPlayer(videoElement, audioElement);
  
    useEventListener("keydown", handleKeys);

    const setMediaSrc = async () => {
      const audioSrc = await fetchData('/media/unodostres.mp3');
      const videoSrc = await fetchData('/media/unodos.mp4');
      audioElement.current.src = audioSrc;
      videoElement.current.src = videoSrc;
      startMedia(true);
    }

    useEffect(() => {
      setMediaSrc();
    }, [])

    if (!mediaActive)
    return (<div className={styles.loader}>Loading...</div>)
  
  return (
    <div className={styles.container}>
      <audio ref={audioElement} />
      <div className={styles['video-wrapper']}>
        <video
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted
        />
        <div className={styles.controls}>
          <div className={styles.actions}>
            <button onClick={togglePlay}>
              <i className={`fa fa-${playerState.isPlaying ? "pause" : "play"}`} style={{ color: "#FFF", fontSize:"28px", cursor: "pointer"}}></i>
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={handleVideoProgress}
          />
        </div>
      </div>
    </div>
  )
}
export default VideoController;
