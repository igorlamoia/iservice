import { Button, useTheme } from '@mui/material';
import './style.scss';
import AssistenciaSVG from '../../../assets/assistencia-tecnica';
import ReparosSVG from '../../../assets/reparos';
import HouseSVG from '../../../assets/house';

export function Categorias() {
  const {
    palette: { mode },
  } = useTheme();
  const themeMode = mode === 'light';

  return (
    <div className="card">
      <p>Todas as categorias de serviços</p>
      <ul className="category-list">
        <li>
          <Button>
            <AssistenciaSVG light={themeMode} />
            <strong>Assistência Técnica</strong>
          </Button>
        </li>

        <li>
          <Button>
            <ReparosSVG light={themeMode} />
            <strong>Reformas e reparos</strong>
          </Button>
        </li>

        <li>
          <Button>
            <HouseSVG light={themeMode} />
            <strong>Serviços domésticos</strong>
          </Button>
        </li>
      </ul>
    </div>
  );
}
