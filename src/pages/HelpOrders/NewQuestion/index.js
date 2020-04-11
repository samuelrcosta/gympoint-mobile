import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import api from '../../../services/api';
import { Container, Input, SendButton, SendButtonText } from './styles';

export default function NewQuestion() {
  const profile = useSelector(state => state.user.profile);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    if (question === '') {
      Alert.alert('Erro', 'Preencha o campo para prosseguir.');
      return;
    }

    setLoading(true);

    try {
      await api.post(`/students/${profile.id}/help-orders`, { question });

      setLoading(false);

      navigation.navigate('HelpOrdersList', { newQuestion: true });
    } catch (err) {
      const { status } = err.response;
      if (status === 403) {
        Alert.alert(
          'Operação não permitida',
          'Você não possui um plano ativo.'
        );
      } else {
        Alert.alert('Erro', 'Falha na comunicação com o servidor.');
      }
      setLoading(false);
    }
  }

  return (
    <Container>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Inclua seu pedido de auxílio"
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        value={question}
        onChangeText={setQuestion}
        returnKeyType="send"
        onSubmitEditing={() => handleSubmit}
      />
      <SendButton loading={loading} onPress={handleSubmit}>
        <SendButtonText>Enviar pedido</SendButtonText>
      </SendButton>
    </Container>
  );
}
