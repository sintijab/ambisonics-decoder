import '@babel/polyfill';
import React from "react";

import { Route } from "react-router-dom";

import VideoController from '../VideoController';
import Player from '../ThreePlayer';
import Main from './main';

const App = () => {
  return (
    <>
      <Route path="/projects" exact children={<Main />} />
      <Route path="/projects/tablao" exact children={<Player />} />
      <Route path="/projects/echo" exact children={<VideoController />} />
    </>
  );
}

export default App;
