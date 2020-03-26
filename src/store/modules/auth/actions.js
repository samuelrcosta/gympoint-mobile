export function signInRequest(student_id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      student_id,
    },
  };
}

export function signInSuccess(user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOutRequest() {
  return {
    type: '@auth/SIGN_OUT_REQUEST',
  };
}

export function signOutSuccess() {
  return {
    type: '@auth/SIGN_OUT_SUCCESS',
  };
}
