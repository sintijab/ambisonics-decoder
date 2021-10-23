# Ambisonics Decoder Lab

Web software tool for delivering high fidelity audio technology at scale of realistic experiences in virtual world based on spectral effects and determined location of the sound. It could an asset for Live coding performance audio rendering with multi-track recording. 

![Audio tools](https://github.com/sintijab/ambisonics-decoder/blob/feat-setup/preview.png?raw=true)
*Image source: https://resonance-audio.github.io/resonance-audio/discover/overview.html*


### Tools:

- [Resonance Audio SDK](https://resonance-audio.github.io/resonance-audio) for Spatial Audio Rendering.

- Render the scene according to the [CodeMirror](https://codemirror.net/) integrated controls.

- NodeJS server with Express framework for OSC Receiver and WebSocket networking, ([express-ws](https://www.npmjs.com/package/express-ws)).

- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) API for creating and managing a WebSocket connection from client to a server.

- Read and send accelerometer, gyroscope and magnetometer device sensors to collect the synthetic data with [Sensor](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs) API.

- Create Augmented Reality App immersive environment using fully synthetic data with [Unity](https://unity.com/).

- Animate sound sources throughout the environment.

- Ambisonic soundfields must represent full 360° spatial audio by encoding sound sources on a virtual structures near the user’s position in a scene around a listener.

### Installing:

Installing dependencies
```
yarn
```
Generating bundle
```
yarn build
```
Starting project locally at :8080 port
```
yarn start
```

### Contribution:
- Research, plan and web software setup: Sintija Birgele
- Solution is part of the challange of AI & Music festival [hackathon](https://aimusicfestival.eu/)