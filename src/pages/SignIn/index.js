import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../assets/logo.png';
import { signInRequest } from '../../store/modules/auth/actions';
import { Container, LogoImage, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [student_id, setStudent_id] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(student_id));
  }

  return (
    <Container>
      <LogoImage source={Logo} />

      <Form>
        <FormInput
          keyboardType="numeric"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={() => handleSubmit}
          value={student_id}
          onChangeText={setStudent_id}
        />

        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
