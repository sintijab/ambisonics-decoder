import '@babel/polyfill';
import React, { useRef } from "react";
import unodostresvideo from './unodos.mp4';
import useVideoPlayer from "./videoHooks";
import styles from './styles.scss';
import unodostres from './unodostres.mp3';
import { useEventListener } from '../App/utils';

const VideoController: React.FC = () => {
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
  
  return (
    <div className={styles.container}>
      <audio src={unodostres} ref={audioElement} />
      <div className={styles['video-wrapper']}>
        <video
          src={unodostresvideo}
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
