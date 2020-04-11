import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const CheckinButton = styled(Button)`
  margin-top: 20px;
`;

export const CheckinButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const LoadingBlock = styled.View`
  margin-top: 20px;
`;

export const EmptyMessage = styled.Text``;

export const List = styled.View`
  margin-bottom: 20px;
`;

export const Checkin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 15px;
`;

export const CheckinTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #444;
`;

export const CheckinDate = styled.Text`
  font-size: 13px;
  color: #444;
`;
