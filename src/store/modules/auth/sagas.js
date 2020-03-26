import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';
import { signInSuccess, signFailure, signOutSuccess } from './actions';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

export function* signIn({ payload }) {
  try {
    const { student_id } = payload;

    const response = yield call(api.get, `/students/${student_id}`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (err) {
    const { status } = err.response;
    if (status === 400) {
      Alert.alert('Falha na autenticação', 'Verifique o seu ID.');
    } else {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    }

    yield put(signFailure());
  }
}

export function* signOut() {
  yield call(delay, 1000);
  yield put(signOutSuccess());
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
