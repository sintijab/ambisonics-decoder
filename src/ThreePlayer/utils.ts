import '@babel/polyfill';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import hardwood2_diffuse from './hardwood2_diffuse.jpg';
import hardwood2_bump from './hardwood2_bump.jpg';
import hardwood2_roughness from './hardwood2_roughness.jpg';
import fragmentshader from './fragmentshader.glsl';
import vertexshader from './vertexshader.glsl';

let scene, camera, renderer;
let geometry, mesh, material;
let bulbLight, bulbMat, hemiLight;
let floorMat;
let mouse;

let previousShadowMap = false;


// ref for lumens: http://www.power-sure.com/lumens.htm
const bulbLuminousPowers = {
    "110000 lm (1000W)": 110000,
    "3500 lm (300W)": 3500,
    "1700 lm (100W)": 1700,
    "800 lm (60W)": 800,
    "400 lm (40W)": 400,
    "180 lm (25W)": 180,
    "20 lm (4W)": 20,
    "Off": 0
};

// ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
const hemiLuminousIrradiances = {
    "0.0001 lx (Moonless Night)": 0.0001,
    "0.002 lx (Night Airglow)": 0.002,
    "0.5 lx (Full Moon)": 0.5,
    "3.4 lx (City Twilight)": 3.4,
};

const params = {
    shadows: true,
    exposure: 1,
    bulbPower: Object.keys( bulbLuminousPowers )[ 1 ],
    irradiance: Object.keys( hemiLuminousIrradiances )[ 0 ],
};

export const init = (containerElement, videoElement) => {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000 );
  camera.position.x = 0;
  camera.position.z = 10;
  camera.position.y = 0.8;

  scene = new THREE.Scene();
  // BULB
  // const bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 8 );
  bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );

  bulbMat = new THREE.MeshStandardMaterial( {
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  } );
  // bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
  bulbLight.position.set( 0, 2, 0 );
  bulbLight.castShadow = true;
  scene.add( bulbLight );

  hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
  scene.add( hemiLight );
  //

  // FLOOR
  floorMat = new THREE.MeshStandardMaterial( {
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005
  } );
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load( hardwood2_diffuse, ( map ) => {

    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 10, 24 );
    map.encoding = THREE.sRGBEncoding;
    floorMat.map = map;
    floorMat.needsUpdate = true;

  } );
  textureLoader.load( hardwood2_bump, ( map ) => {

    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 10, 24 );
    floorMat.bumpMap = map;
    floorMat.needsUpdate = true;

  } );
  textureLoader.load(hardwood2_roughness, ( map ) => {

    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 10, 24 );
    floorMat.roughnessMap = map;
    floorMat.needsUpdate = true;

  } );

  const floorGeometry = new THREE.PlaneGeometry( 20, 20 );
  const floorMesh = new THREE.Mesh( floorGeometry, floorMat );
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = - Math.PI / 2.0;
  scene.add( floorMesh );
  //

  const texture = new THREE.VideoTexture( videoElement.current );
  texture.minFilter = THREE.NearestFilter;

  const width = 2080, height = 1920;
  const nearClipping = 1, farClipping = 413;
  

  geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array( width * height * 3 );

  for ( let i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

    vertices[ i ] = j % width;
    vertices[ i + 1 ] = Math.floor( j / width );

  }

  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

  material = new THREE.ShaderMaterial( {

    uniforms: {

      "map": { value: texture },
      "width": { value: width },
      "height": { value: height },
      "nearClipping": { value: nearClipping },
      "farClipping": { value: farClipping },

      "pointSize": { value: 2 },
      "zOffset": { value: 165 }

    },
    vertexShader: vertexshader,
    fragmentShader: fragmentshader,
    blending: THREE.AdditiveBlending,
    depthTest: false, depthWrite: false,
    transparent: true

  } );

  mesh = new THREE.Points( geometry, material );
  scene.add( mesh );

  const gui = new GUI();
  gui.add( material.uniforms.nearClipping, 'value', 1, 10000, 1.0 ).name( 'nearClipping' );
  gui.add( material.uniforms.farClipping, 'value', 1, 10000, 1.0 ).name( 'farClipping' );
  gui.add( material.uniforms.pointSize, 'value', 1, 10, 1.0 ).name( 'pointSize' );
  gui.add( material.uniforms.zOffset, 'value', 0, 4000, 1.0 ).name( 'zOffset' );
  gui.add( params, 'irradiance', Object.keys( hemiLuminousIrradiances ) );
  gui.add( params, 'bulbPower', Object.keys( bulbLuminousPowers ) );
  gui.add( params, 'exposure', 0, 1 );
  gui.add( params, 'shadows' );
  gui.open();

  videoElement.current.play()

  renderer = new THREE.WebGLRenderer();
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  containerElement.current.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 1;
  controls.maxDistance = 20;

  mouse = new THREE.Vector3( 0, 0, 1 );

}

export const onWindowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

export const onDocumentMouseMove = ( event ) => {
  if (!mouse) return;
  mouse.x = ( event.clientX - window.innerWidth / 2 ) * 8;
  mouse.y = ( event.clientY - window.innerHeight / 2 ) * 8;

}

export const animate = () => {

  requestAnimationFrame( animate );

  render();

}

export const render = () => {

  renderer.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
  renderer.shadowMap.enabled = params.shadows;
  bulbLight.castShadow = params.shadows;

  if ( params.shadows !== previousShadowMap ) {

      floorMat.needsUpdate = true;
      previousShadowMap = params.shadows;

  }

  bulbLight.power = bulbLuminousPowers[ params.bulbPower ];
  bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface

  hemiLight.intensity = hemiLuminousIrradiances[ params.irradiance ];
  const time = Date.now() * 0.0005;

  bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;

  renderer.render( scene, camera );
}


