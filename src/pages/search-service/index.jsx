import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components';
import { BreadCrumbsMenu } from './bread-crumbs-menu';
// import useGeoLocation from '../../hooks/useGeolocation';

export default function SearchService() {
  const { state } = useLocation();

  const service = state || {};

  return (
    <Container sx={{ minHeight: '100vh', pt: 2 }}>
      <Navbar />
      <BreadCrumbsMenu params={service} />
    </Container>
  );
}
