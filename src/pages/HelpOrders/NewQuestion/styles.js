import styled from 'styled-components/native';

import Button from '../../../components/Button';
import TextInput from '../../../components/Input';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const Input = styled(TextInput)`
  background-color: #fff;
  margin-top: 20px;
  font-size: 15px;
  padding: 0;
  height: 150px;
`;

export const SendButton = styled(Button)`
  margin-top: 15px;
`;

export const SendButtonText = styled.Text`
  color: #fff;
`;
