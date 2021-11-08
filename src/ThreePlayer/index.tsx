import '@babel/polyfill';
import React, { useRef, useEffect } from "react";
import { useEventListener } from '../App/utils';
import videoSrc from "./fandangos.mp4";
import { animate, init, onDocumentMouseMove, onWindowResize } from './utils';
import fandangos from './fandangos.mp3';
import { initAudio } from '../VideoController/audioHooks';

const Player: React.FC = () => {
  const videoElement = useRef(null);
  const containerElement = useRef(null);
  const audioElement = useRef(null);

  useEventListener("mousemove", onDocumentMouseMove);
  useEventListener("resize", onWindowResize);

  useEffect(() => {
    init(containerElement, videoElement)
    animate();
    initAudio(audioElement.current);
    audioElement.current.play();
  }, [])

  return (
    <div>
      <audio src={fandangos} ref={audioElement} />
      <video ref={videoElement} loop muted crossOrigin="anonymous" playsInline style={{ display: 'none'}}>
        <source src={videoSrc} />
      </video>
      <div ref={containerElement} />
    </div>
  )
}
export default Player;
