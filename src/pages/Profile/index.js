import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, getYear } from 'date-fns';

import { signOutRequest } from '../../store/modules/auth/actions';
import {
  Container,
  AvatarArea,
  Avatar,
  AvatarText,
  InfoData,
  InfoText,
  EnrollsArea,
  EnrollBlock,
  EnrollHeader,
  EnrollIconArea,
  EnrollPlanStatus,
  EnrollPlan,
  EnrollBody,
  EnrollText,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.auth.loading);
  const [enrolls, setEnrolls] = useState([]);
  const defaultBirth = new Date(`${profile.birth}T07:00:00.000Z`);

  const avatarName = useMemo(() => profile.name.substring(0, 2).toUpperCase(), [
    profile,
  ]);

  const birth = useMemo(() => {
    return format(defaultBirth, "dd'/'MM'/'Y");
  }, [defaultBirth]);

  const age = useMemo(() => getYear(new Date()) - getYear(defaultBirth), [
    defaultBirth,
  ]);

  useEffect(() => {
    setEnrolls(
      profile.enrolls.map(enroll => ({
        ...enroll,
        formattedStartDate: format(
          new Date(`${enroll.start_date}T07:00:00.000Z`),
          "dd'/'MM'/'Y"
        ),
        formattedEndDate: format(
          new Date(`${enroll.end_date}T07:00:00.000Z`),
          "dd'/'MM'/'Y"
        ),
      }))
    );
  }, [profile]);

  function handleLogout() {
    dispatch(signOutRequest());
  }

  return (
    <Container>
      <AvatarArea>
        <Avatar>
          <AvatarText>{avatarName}</AvatarText>
        </Avatar>
      </AvatarArea>

      <InfoData>
        <InfoText>{profile.name}</InfoText>
        <InfoText>{profile.email}</InfoText>
        <InfoText>
          {profile.height}cm - {profile.weight}kg
        </InfoText>
        <InfoText>
          {birth} ({age} anos)
        </InfoText>

        <EnrollsArea>
          {enrolls.map(enroll => (
            <EnrollBlock key={enroll.id}>
              <EnrollHeader>
                <EnrollIconArea>
                  <Icon
                    name="check-circle"
                    size={14}
                    color={enroll.active ? '#28a745' : '#6c757d'}
                  />
                  <EnrollPlanStatus
                    color={enroll.active ? '#28a745' : '#6c757d'}
                  >
                    {enroll.active ? 'Ativo' : 'Expirado'}
                  </EnrollPlanStatus>
                </EnrollIconArea>

                <EnrollPlan>{enroll.plan.title}</EnrollPlan>
              </EnrollHeader>
              <EnrollBody>
                <EnrollText>Início: {enroll.formattedStartDate}</EnrollText>
                <EnrollText>Fim: {enroll.formattedEndDate}</EnrollText>
              </EnrollBody>
            </EnrollBlock>
          ))}
        </EnrollsArea>
      </InfoData>

      <LogoutButton onPress={handleLogout} loading={loading}>
        Sair
      </LogoutButton>
    </Container>
  );
}
