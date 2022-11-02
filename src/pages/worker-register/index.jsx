import { Box, Container } from '@mui/material';
import { Navbar } from '../../components';
import LocationInputs from './location-search';

export default function WorkerRegister() {
  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <LocationInputs />
        </Box>
      </Container>
    </>
  );
}
