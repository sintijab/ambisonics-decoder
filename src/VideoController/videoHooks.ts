import { useState, useEffect } from "react";
import { initAudio } from "./audioHooks";

const useVideoPlayer = (videoElement, audioElement) => {

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    audioInit: false,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
      audioInit: true
    });
  };
  useEffect(() => {
    if (playerState.audioInit) {
      audioElement.current.playbackRate = 1.02;
      videoElement.current.playbackRate = 1;
      initAudio(audioElement.current);
    }
  }, [playerState.audioInit]);

  useEffect(() => {
    if (playerState.isPlaying) {
      audioElement.current.play();
      videoElement.current.play();
    } else {
      videoElement.current.pause();
      audioElement.current.pause();
    }
  }, [playerState.isPlaying]);

  const handleOnTimeUpdate = () => {
    let vidDuration = videoElement?.current?.duration;
    let vidActiveTime = videoElement?.current?.currentTime;
    const progress = (vidActiveTime / vidDuration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleKeys = (e) => {
    const activeKey = e.key && e.key.length > 1 ? e.key : e.code;
    let vidDuration = videoElement?.current?.duration;
    let vidActiveTime = videoElement?.current?.currentTime;

    switch (activeKey) {
      case "Down":
      case "ArrowDown":
        if (audioElement.current.volume <= 0.1) {
          break;
        } else {
          audioElement.current.volume -= 0.1;
          audioElement.current.volume = parseFloat(audioElement.current.volume).toFixed(2);
        }
        break;
      case "Up":
      case "ArrowUp":
        if (audioElement.current.volume >= 1) {
          break;
        } else {
          audioElement.current.volume += 0.1;
          audioElement.current.volume = parseFloat(audioElement.current.volume).toFixed(2);
        }
        break;
      case "Left":
      case "ArrowLeft":
        if (vidActiveTime < 0) {
          handleVideoProgress({ target: { value: 0 }});
        } else {
          handleVideoProgress({ target: { value: playerState.progress - 10 }});
        }
        break;
      case "Right":
      case "ArrowRight":
        if (vidActiveTime > vidDuration) {
          handleVideoProgress({ target: { value: 0 }});
        } else {
          handleVideoProgress({ target: { value: playerState.progress + 10 }});
        }
        break;
      case "Enter":
      case "Space":
        togglePlay();
        break;
      case "Esc":
      case "Escape":

        break;
      default:
        return;
    }
  }

  const handleVideoProgress = (event) => {
    if (playerState.isPlaying) {
      videoElement.current.pause();
      audioElement.current.pause();
    }
    let vidDuration = videoElement?.current?.duration;
    let audioDuration = audioElement?.current?.duration;
    const targetValue = Number(event.target.value);
    audioElement.current.currentTime = (vidDuration / 100) * targetValue;
    videoElement.current.currentTime = (audioDuration / 100) * targetValue;
    setPlayerState({
      ...playerState,
      progress: targetValue,
    });
    if (playerState.isPlaying) {
      videoElement.current.play();
      audioElement.current.play();
    }
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleKeys,
  };

};

export default useVideoPlayer;