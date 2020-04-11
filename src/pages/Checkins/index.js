import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, ActivityIndicator } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import {
  Container,
  CheckinButton,
  CheckinButtonText,
  LoadingBlock,
  EmptyMessage,
  List,
  Checkin,
  CheckinTitle,
  CheckinDate,
} from './styles';

export default function Checkins() {
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [checkins, setCheckins] = useState([]);
  const profile = useSelector(state => state.user.profile);

  async function loadCheckings() {
    setLoading(true);

    try {
      const response = await api.get(`/students/${profile.id}/checkins`);

      const checks = response.data.map((item, index) => ({
        ...item,
        counter: response.data.length - index,
        dateParsed: formatRelative(parseISO(item.created_at), new Date(), {
          locale: pt,
          addSufix: true,
        }),
      }));

      setCheckins(checks);

      setLoading(false);
    } catch (err) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCheckings();
  }, []); // eslint-disable-line

  async function newCheckin() {
    if (loadingAction) {
      return;
    }

    try {
      setLoadingAction(true);

      await api.post(`/students/${profile.id}/checkins`);

      setLoadingAction(false);

      loadCheckings();
    } catch (err) {
      const { status } = err.response;
      if (status === 403) {
        Alert.alert(
          'Operação não permitida',
          'Você não possui um plano ativo para fazer o checkin.'
        );
      } else {
        Alert.alert('Erro', 'Falha na comunicação com o servidor.');
      }
      setLoadingAction(false);
    }
  }

  return (
    <Container>
      <CheckinButton onPress={newCheckin} loading={loadingAction}>
        <CheckinButtonText>Novo check-in</CheckinButtonText>
      </CheckinButton>

      {loading && (
        <LoadingBlock>
          <ActivityIndicator size="large" color="#ccc" />
        </LoadingBlock>
      )}

      {!loading && checkins.length > 0 && (
        <List>
          {checkins.map(item => (
            <Checkin key={String(item.counter)}>
              <CheckinTitle>Check-in #{item.counter}</CheckinTitle>
              <CheckinDate>{item.dateParsed}</CheckinDate>
            </Checkin>
          ))}
        </List>
      )}

      {!loading && checkins.length === 0 && (
        <EmptyMessage>Nenhum checkin encontrado.</EmptyMessage>
      )}
    </Container>
  );
}
