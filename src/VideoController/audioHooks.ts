import { ResonanceAudio } from 'resonance-audio';

export const initAudio = (audioElement) => {
    let audioContext = new AudioContext();
    let resonanceAudioScene = new ResonanceAudio(audioContext);
    resonanceAudioScene.output.connect(audioContext.destination);
    let roomDimensions = {
      width: 8.1,
      height: 6.5,
      depth: 5.4,
    };
    let roomMaterials = {
      left: 'marble',
      right: 'marble',
      front: 'curtain-heavy',
      back: 'marble',
      down: 'plywood-panel',
      up: 'acoustic-ceiling-tiles',
    };
    resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);
    let audioElementSource = audioContext.createMediaElementSource(audioElement);
    resonanceAudioScene.setListenerPosition(0, 0, 0);
    let source = resonanceAudioScene.createSource();
    audioElementSource.connect(source.input);
    source.setPosition(0, 0, 0);
  };