/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { BsCalendar2Date, BsTrophy } from 'react-icons/bs';
import { MdStorage } from 'react-icons/md';
import { ImMobile } from 'react-icons/im';

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/perfil", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/perfil">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span className="menu-text">Perfil</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
  
        {/* Components */}
        {/* begin::section */}
        <li className="menu-section">
          <h4 className="menu-text">Comandas</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/* begin::1 Level */}
        <li
          className={`menu-item ${getMenuItemActive("/cadastros-basicos", true)}`}
          aria-haspopup="true"
        >
          <NavLink
            className="menu-link menu-toggle"
            to="/cadastros-basicos"
          >
            <span className="svg-icon menu-icon">
              <MdStorage />
            </span>
            <span className="menu-text">Cadastros Básicos</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow"></i>
            <ul className="menu-subnav">
              {/* Submenu Item */}
              <li
                className={`menu-item ${getMenuItemActive("/clientes", false)}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/clientes"
                >
                  <span className="menu-text">Clientes</span>
                </NavLink>
              </li>
              {/* End of Submenu Item */}
      
              {/* Submenu Item */}
              <li
                className={`menu-item ${getMenuItemActive("/produtos-categorias", false)}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/produtos-categorias"
                >
                  <span className="menu-text">Categoria de Produtos</span>
                </NavLink>
              </li>
              {/* End of Submenu Item */}
        
              {/* Submenu Item */}
              <li
                className={`menu-item ${getMenuItemActive("/comandas", false)}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/comandas"
                >
                  <span className="menu-text">Comandas</span>
                </NavLink>
              </li>
              {/* End of Submenu Item */}
        
              {/* Submenu Item */}
              <li
                className={`menu-item ${getMenuItemActive("/mesas", false)}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/mesas"
                >
                  <span className="menu-text">Mesas</span>
                </NavLink>
              </li>
              {/* End of Submenu Item */}
        
              {/* Submenu Item */}
              <li
                className={`menu-item ${getMenuItemActive("/produtos", false)}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/produtos"
                >
                  <span className="menu-text">Produtos</span>
                </NavLink>
              </li>
              {/* End of Submenu Item */}
            </ul>
          </div>
        </li>
        {/* end::1 Level */}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/consumo", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/consumo">
            <span className="svg-icon menu-icon">
              <ImMobile />
            </span>
            <span className="menu-text">Consumo</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Components */}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Ferramentas</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/agenda", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/agenda">
            <span className="svg-icon menu-icon">
              <BsCalendar2Date />
            </span>
            <span className="menu-text">Agenda</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/torneios", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/torneios">
            <span className="svg-icon menu-icon">
              <BsTrophy />
            </span>
            <span className="menu-text">Torneios</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
