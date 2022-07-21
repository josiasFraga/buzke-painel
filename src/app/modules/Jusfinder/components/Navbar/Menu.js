import React from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  Dropdown,
} from "react-bootstrap";
import * as auth from "../../../Auth/_redux/authRedux";
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
    
  li.ferramentas:hover .content-ferramentas { display: block }
  li.ferramentas:active .content-ferramentas { display: block }

  li {
      cursor: pointer;
      padding: 10px 30px;
      color:#091740;

  }

  li a { text-decoration: none; color: inherit }



  li.active {
        cursor:pointer; background: #F47161; color:#fff; border-radius: 20px; margin-left: 22px
    }
    li.active:hover { background: #D05D4F; }

  .dropdown button { font-weight: 400 !important; font-size: 16px !important; background-color: #F47161 !important; padding: 10px 30px !important; border-color: #F47161 !important; border-radius: 20px !important; margin-left: 22px !important}
  .dropdown button:hover { background-color: #D05D4F !important }
  .dropdown .dropdown-item:active { background-color: #F47161; }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 7rem;
    transition: transform 0.3s ease-in-out;
    z-index: 1000;

    li {
      color: #fff;
      font-size: 15px;
      padding: 18px;
    }


    li.active {
        cursor:pointer; background: #F47161; color:#fff; border-radius: 20px;
        width: 223px;
        padding: 10px 0px 8px 15px;
        margin-left: 6px;
        margin-top: 11px;
    }

    .dropdown button { margin-left: -13px !important }




  }
`;

const DropdownFerramentas = styled.div`
  position: relative; display: inline-block;
  /*:hover .content-ferramentas { display: block !important; }*/
  :hover .dropbtn { background-color: #3e8e41; }

  

  .content-ferramentas { display: none; position: absolute; right:-30px; background-color: #fff; min-width: 335px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1); z-index: 10000; border-radius: 10px; }
  .content-ferramentas div { padding: 20px 20px 5px 20px; border-bottom: 1px solid #f1f1f1; }
  .content-ferramentas div:last-child { border:none; }
  .content-ferramentas div:hover { background: #f1f1f1; border-radius: 10px; }
  .content-ferramentas img.revisional { width: 130px; }
  .content-ferramentas img.calc { width: 80px; }
  .content-ferramentas img.finder { width: 90px; }
  .content-ferramentas img.file { width: 60px; }
  .content-ferramentas img.match { width: 100px; }
  .content-ferramentas img.decision { width: 115px; }

  .content-ferramentas div p { font-size: 13px; margin-top: 5px; opacity: 0.6; color: rgb(9,23,64) }



`;

const Menu = ({ open, login }) => {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  const user = useSelector((state) => state.auth.user);

  const deslogar = () => {
    dispatch({type: auth.actionTypes.Logout});

  }


  return (
    <Ul open={open}>
      <li><a href="https://jusfy.com.br" target="_BLANK">Página Inicial</a></li>
      <li><a href="https://jusfy.com.br/sobre.html" target="_BLANK">Sobre</a></li>
      <li className="ferramentas">
        <DropdownFerramentas>Ferramentas
                <div className="content-ferramentas">
                <a href="https://jusfy.com.br/jusrevisional.html" target="_BLANK" className="link-landing">
                        <div>
                            <img src={toAbsoluteUrl("/media/logos/jusrevisional.svg")} className="revisional"/>
                            <p>Recalcule um financiamento automaticamente.</p>
                        </div>
                    </a>

                    <a href="https://jusfy.com.br/juscalc.html" target="_BLANK" className="link-landing">
                        <div>
                            <img src={toAbsoluteUrl("/media/logos/juscalc.svg")} className="calc"/>
                            <p>Realize os mais diversos cálculos financeiros com base em correção monetária.</p>
                        </div>
                    </a>

                    <a href="https://jusfinder.com.br" target="_BLANK" className="link-landing">

                        <div>
                            <img src={toAbsoluteUrl("/media/logos/jusfinder.svg")} className="finder"/>
                            <p>Encontre o réu facilmente e muito mais</p>
                        </div>
                    </a>

                    <a href="https://jusfy.com.br/jusfile.html" target="_BLANK" className="link-landing">
                        <div>
                            <img src={toAbsoluteUrl("/media/logos/jusfile.svg")} className="file"/>
                            <p>Tenha acesso a um banco com milhares de arquivos como petições e muito mais.</p>
                        </div>
                    </a>

                    <a href="https://jusfy.com.br/jusmatch.html" target="_BLANK" className="link-landing">
                        <div>
                            <img src={toAbsoluteUrl("/media/logos/jusmatch.svg")} className="match"/>
                            <p>Encontre novos potenciais clientes.</p>
                        </div>
                    </a>

                    <a href="https://jusfy.com.br/jusdecision.html" target="_BLANK" className="link-landing">
                        <div>
                            <img src={toAbsoluteUrl("/media/logos/jusdecision.svg")} className="decision"/>
                            <p>Com apenas alguns cliques, descubra se há jurisprudência para uma ação.</p>
                        </div>
                    </a>
                </div>
              </DropdownFerramentas>
            </li>
      <li><a href="https://jusfy.com.br/#div-planos" target="_BLANK">Planos</a></li>
    { !isAuthorized &&
      <li className="active" onClick={login}>Entrar</li>
    }
    { isAuthorized &&
      <Dropdown>
        <Dropdown.Toggle className="active">
            <span className="pointer" style={{color: '#fff'}}>Bem-vindo, {user.name.split(" ")[0]}.  </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}}>Meu Perfil</Dropdown.Item>
        <Dropdown.Item onClick={deslogar}>Deslogar</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
    </Ul>
  )
}

export default Menu
