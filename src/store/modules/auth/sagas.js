import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { student_id } = payload;

    const response = yield call(api.get, `/students/${student_id}`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (err) {
    if (err.code === 400) {
      Alert.alert('Falha na autenticação', 'Verifique o seu ID.');
    } else {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    }

    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
