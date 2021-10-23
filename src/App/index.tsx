import '@babel/polyfill';
import React from 'react';
import Header from '../Header';

type Props = {
  title: string;
};

const App: React.FC<Props> = ({ title }: Props) => (
  <div>
    <Header />
    {title}
  </div>
);
export default App;
