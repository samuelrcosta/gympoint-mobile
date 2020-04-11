import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, ActivityIndicator } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';
import { truncateString } from '../../utils/helpers';
import {
  Container,
  CreateButton,
  CreateButtonText,
  LoadingBlock,
  EmptyMessage,
  List,
  Ask,
  AskHeader,
  AskTitle,
  AskTitleText,
  AskDate,
  AskBody,
} from './styles';

export default function HelpOrders() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [asks, setAsks] = useState([]);
  const profile = useSelector(state => state.user.profile);

  async function loadAsks() {
    setLoading(true);

    try {
      const response = await api.get(`/students/${profile.id}/help-orders`);

      const questions = response.data.map(item => ({
        ...item,
        dateParsed: formatRelative(
          parseISO(item.answer_at ? item.answer_at : item.createdAt),
          new Date(),
          {
            locale: pt,
            addSufix: true,
          }
        ),
        truncatedQuestion: truncateString(item.question, 125),
      }));

      setAsks(questions);

      setLoading(false);
    } catch (err) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAsks();
  }, [route.params]); // eslint-disable-line

  function newAsk() {
    navigation.navigate('HelpOrdersNew');
  }

  function showAsk(item) {
    navigation.navigate('HelpOrdersShow', { itemData: item });
  }

  return (
    <Container>
      <CreateButton onPress={newAsk}>
        <CreateButtonText>Novo pedido de auxílio</CreateButtonText>
      </CreateButton>

      {loading && (
        <LoadingBlock>
          <ActivityIndicator size="large" color="#ccc" />
        </LoadingBlock>
      )}

      {!loading && asks.length > 0 && (
        <List>
          {asks.map(item => (
            <Ask key={String(item.id)} onPress={() => showAsk(item)}>
              <AskHeader>
                <AskTitle>
                  <Icon
                    name="check-circle"
                    size={14}
                    color={item.answer ? '#42cb59' : '#999999'}
                  />
                  <AskTitleText active={!!item.answer}>
                    {item.answer ? 'Respondido' : 'Sem Resposta'}
                  </AskTitleText>
                </AskTitle>
                <AskDate>{item.dateParsed}</AskDate>
              </AskHeader>
              <AskBody>{item.truncatedQuestion}</AskBody>
            </Ask>
          ))}
        </List>
      )}

      {!loading && asks.length === 0 && (
        <EmptyMessage>Nenhum pedido de auxílio encontrado.</EmptyMessage>
      )}
    </Container>
  );
}
