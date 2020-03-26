import React from 'react';
import logo from '../../assets/logo-header.png';

import { Container, Icon } from './styles';

export default function Topbar() {
  return (
    <Container>
      <Icon source={logo} />
    </Container>
  );
}
