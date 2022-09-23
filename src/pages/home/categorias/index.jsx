import AssistenciaSVG from '../../../assets/assistencia-tecnica.svg';
import ReparosSVG from '../../../assets/reparos.svg';
import HouseSVG from '../../../assets/house.svg';
import './style.scss';

export function Categorias() {
  return (
    <div className="card">
      <p>Todas as categorias de serviços</p>
      <ul className="category-list">
        <li>
          <a href="#">
            <img src={AssistenciaSVG} alt="" />
            <strong>Assistência Técnica</strong>
          </a>
        </li>

        <li>
          <a href="#">
            <img src={ReparosSVG} alt="" />
            <strong>Reformas e reparos</strong>
          </a>
        </li>

        <li>
          <a href="#">
            <img src={HouseSVG} alt="" />
            <strong>Serviços domésticos</strong>
          </a>
        </li>
      </ul>
    </div>
  );
}
