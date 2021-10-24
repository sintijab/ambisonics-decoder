# Ambisonics Decoder Lab
Web software tool for delivering high fidelity audio technology for live performances.

### About:
Web software tool for delivering high fidelity audio technology at scale of realistic experiences in virtual world based on spectral effects and determined location of the sound. It could an asset for Live coding performance audio rendering with multi-track recording. 

### Introduction:

Inspired by [DRESSX](https://dressx.com/) vision: “We strongly believe that the amount of clothing produced today is way greater than humanity needs.”. As a dancer and web software engineer I have learned that live performing is crucial for the acknowledgment of the skills and process which brings us to new discoveries. Moreover it is only possible with bidirectional relationship model between transmitter and receiver, imaginary and real world towards real experiences. "With the current global challenges we should find a ways to produce less, to produce more sustainably, and not to produce at all."

![Dress](https://cdn.shopify.com/s/files/1/0412/1912/9497/products/1227_1_1080x.png?v=1628167808)
*Image source: https://dressx.com/products/multicolored-dress-kaikai*

### Solution:
Training models with live data from dance performers and sending back signals from complex sound environments modelled to extend performers spatial perception with artificial sources for live performance.

### Prototype:
- Define room dimensions
- Define materials for each of the room’s surfaces
- Control the location and number of sound sources
- Control the listeners position in relation to the room dimensions

![Audio tools](https://github.com/sintijab/ambisonics-decoder/blob/feat-setup/studio_room.jpg?raw=true)

- Control room materials which has different acoustic reflectivity.

![Audio tools](https://github.com/sintijab/ambisonics-decoder/blob/feat-setup/absorption.jpg?raw=true)

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