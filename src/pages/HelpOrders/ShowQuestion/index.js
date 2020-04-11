import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import {
  Container,
  Box,
  TitleContainer,
  Title,
  HeaderDate,
  Body,
} from './styles';

export default function ShowQuestion() {
  const route = useRoute();
  const data = route.params.itemData;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container>
      <Box>
        <TitleContainer>
          <Title>Pergunta</Title>
          <HeaderDate>{data.dateParsed}</HeaderDate>
        </TitleContainer>
        <Body>{data.question}</Body>
        {data.answer && (
          <>
            <TitleContainer>
              <Title>Resposta</Title>
            </TitleContainer>
            <Body>{data.answer}</Body>
          </>
        )}
      </Box>
    </Container>
  );
}
