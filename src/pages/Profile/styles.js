import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
  background-color: #f5f5f5;
`;

export const AvatarArea = styled.View`
  align-items: center;
`;

export const Avatar = styled.View`
  margin-top: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ee4e62;
`;

export const AvatarText = styled.Text`
  text-align: center;
  font-size: 40px;
  color: #fff;
`;

export const InfoData = styled.View`
  margin-top: 10px;
`;

export const InfoText = styled.Text`
  text-align: center;
  color: #333;
`;

export const EnrollsArea = styled.View`
  margin-top: 10px;
`;

export const EnrollBlock = styled.View`
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;
`;

export const EnrollHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const EnrollIconArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EnrollPlanStatus = styled.Text`
  color: ${props => props.color || '#999999'};
  margin-left: 5px;
  font-weight: bold;
`;

export const EnrollPlan = styled.Text`
  color: #999999;
`;

export const EnrollBody = styled.View`
  margin-top: 15px;
`;

export const EnrollText = styled.Text`
  color: #999999;
`;

export const LogoutButton = styled(Button)`
  margin: 10px 0;
`;
