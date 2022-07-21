/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink, Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { Modal } from "react-bootstrap";
import ModalCalculo from './ModalCalculo';
import { KTUtil } from "../../../../../_metronic/_assets/js/components/util.js";

export function AsideMenuList({ layoutProps }) {
	const location = useLocation();
	const [isNovoCalculoOpen, setIsNovoCalculoOpen] = useState(false);
	const getMenuItemActive = (url, hasSubmenu = false) => {
		return checkIsActive(location, url)
			? ` ${!hasSubmenu &&
			"menu-item-active"} menu-item-open menu-item-not-hightlighted`
			: "";
	};
	const _body = KTUtil.getBody();


	/*const getClasses = () => {
	  return Array.from(document.body.classList).includes('aside-minimize');
	}*/

	return (
		<>
			<ModalCalculo isOpen={isNovoCalculoOpen} close={() => setIsNovoCalculoOpen(false)} />

			<button className="tour-novo-calculo btn btn-primary novo-calculo" id="btn-novo-calculo"
				onClick={() => setIsNovoCalculoOpen(true)}
				type="button">NOVO CÁLCULO</button>

			{/* begin::Menu Nav */}
			<ul className={`menu-nav ${layoutProps.ulClasses}`}>
				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/dashboard">
						<span className="menu-text">Início</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}

				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/clientes", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/clientes">
						<span className="menu-text">Meus Clientes</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}

				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/calculos", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/calculos">
						<span className="menu-text">Meus Cálculos</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}

				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/perfil", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/perfil">
						<span className="menu-text">Meu Perfil</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}


				

				<li className="divider">Ferramentas</li>


				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/oportunidades", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link tour-oportunidades" to="/oportunidades">
						<span className="svg-icon menu-icon">
							<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Bulb1.svg")} />
						</span>
						<span className="menu-text" style={{width: '100%'}}>JusMatch</span>
            			<span className="menu-text-small">Oportunidades</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}

				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/jurisprudencia", false)}`}
					aria-haspopup="true"
					>
					<NavLink className="menu-link tour-jurisprudencias" to="/jurisprudencia">
						<span className="svg-icon menu-icon">
						<i className="icon-lg fas fa-gavel"></i>
						</span>
						<span className="menu-text" style={{width: '100%'}}>JusDecision</span>
						<span className="menu-text-small">Jurisprudências</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}

				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/peticoes", false)}`}
					aria-haspopup="true"
					>
					<NavLink className="menu-link tour-peticoes" to="/peticoes">
						<span className="svg-icon menu-icon">
						<SVG src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")} />
						</span>
						<span className="menu-text" style={{width: '100%'}}>JusFile</span>
						<span className="menu-text-small">Petições</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}


				{/*begin::1 Level*/}
				<li
					className={`menu-item`}
					aria-haspopup="true"
					>
					<a className="menu-link tour-jusfinder" target="_BLANK" href="https://jusfinder.com.br">
						<span className="svg-icon menu-icon">
						<SVG src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")} />
						</span>
						<span className="menu-text" style={{width: '100%'}}>JusFinder</span>
						<span className="menu-text-small">Consultas</span>
					</a>
				</li>
				{/*end::1 Level*/}
				{/*end::1 Level*/}

				{/*begin::1 Level*/}
				<li
					className={`menu-item`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/logout">
						<span className="menu-text">Sair do sistema</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}
			</ul>
		{/*
			<div className="support">
				<button>Precisa de ajuda? <span>Fale conosco no WhatsApp</span></button>
				<a href="https://api.whatsapp.com/send?phone=+5511933304069&text=&source=&data=" target="_blank">
					<div className="whatsappIcon">
						<i class="flaticon-whatsapp icon-2x"></i>
					</div>
				</a>
			</div>
			*/
		}

			{/* end::Menu Nav */}
		</>
	);
}
