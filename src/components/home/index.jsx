import React from 'react';
import './style.scss';
import AssistenciaSVG from '../../assets/assistencia-tecnica.svg';
import ReparosSVG from '../../assets/reparos.svg';
import HouseSVG from '../../assets/house.svg';
export default function Home() {
	return (
		<div className="card">
			<p>Todas as categorias de serviços</p>
			<ul className="category-list">
				<li>
					<a href="#">
						<img src={AssistenciaSVG} alt="" />
						<span>Assistência Técnica</span>
					</a>
				</li>

				<li>
					<a href="#">
						<img src={ReparosSVG} alt="" />
						<span>Reformas e reparos</span>
					</a>
				</li>

				<li>
					<a href="#">
						<img src={HouseSVG} alt="" />
						<span>Serviços domésticos</span>
					</a>
				</li>
			</ul>
		</div>
	);
}
