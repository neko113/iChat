import styled from '@emotion/styled';
import { Button } from '~/components/common';

const PublishSeriesSetting = () => {
  return (
    <Container>
      <Title>Series Setting</Title>
      <Button shadow size="auto" color="warning" onClick={() => {}}>
        Add To Series
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

const Title = styled.div`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export default PublishSeriesSetting;