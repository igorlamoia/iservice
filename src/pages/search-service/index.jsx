import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../../components';
import { BoxService } from './box-service';
import { BreadCrumbsMenu } from './bread-crumbs-menu';

// import T2 from '../../assets/t2.json';
// import useGeoLocation from '../../hooks/useGeolocation';

export default function SearchService() {
  const { state } = useLocation();

  const service = state || {};

  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: '100vh', pt: 2 }}>
        <BreadCrumbsMenu params={service} />
        <BoxService service={service} />
      </Container>
      <Footer />
    </>
  );
}
