import { Breadcrumbs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { StyledLink, TypographyLink } from './styles';

export function BreadCrumbsMenu({ params = {} }) {
  const {
    nomeCategoria,
    nomeEspecialidade,
    descricao,
    codCategoria,
    codEspecialidade,
  } = params;

  const navigate = useNavigate();

  const handleCategoria = () => {
    navigate('/search/service', {
      state: { nomeCategoria, codCategoria },
    });
  };
  const handleProfissao = () => {
    navigate('/search/service', {
      state: {
        nomeCategoria,
        codCategoria,
        nomeEspecialidade,
        codEspecialidade,
      },
    });
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {!!nomeCategoria && (
        <StyledLink onClick={handleCategoria}>
          <TypographyLink>{nomeCategoria}</TypographyLink>
        </StyledLink>
      )}
      {!!nomeEspecialidade && (
        <StyledLink onClick={handleProfissao}>
          <TypographyLink>{nomeEspecialidade}</TypographyLink>
        </StyledLink>
      )}
      {!!descricao && (
        <StyledLink sx={{ cursor: 'default' }}>
          <TypographyLink sx={{ color: 'text.primary' }} noWrap>
            {descricao}
          </TypographyLink>
        </StyledLink>
      )}
    </Breadcrumbs>
  );
}
