import React from 'react';
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';

import Routes from './Routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  return <Routes signed={signed} />;
}
