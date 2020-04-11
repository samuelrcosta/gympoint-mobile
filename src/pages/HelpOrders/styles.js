import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const CreateButton = styled(Button)`
  margin-top: 20px;
`;

export const CreateButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const LoadingBlock = styled.View`
  margin-top: 20px;
`;

export const EmptyMessage = styled.Text`
  margin-top: 20px;
  text-align: center;
`;

export const List = styled.View`
  margin-bottom: 20px;
`;

export const Ask = styled.TouchableOpacity`
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 15px;
`;

export const AskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const AskTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AskTitleText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${props => (props.active ? '#42cb59' : '#444')};
  margin-left: 3px;
`;

export const AskDate = styled.Text`
  font-size: 13px;
  color: #444;
`;

export const AskBody = styled.Text``;
