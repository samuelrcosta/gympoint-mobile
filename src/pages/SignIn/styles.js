import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
`;

export const LogoImage = styled.Image`
  width: 105px;
  height: 65px;
  margin-bottom: 20px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)``;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
