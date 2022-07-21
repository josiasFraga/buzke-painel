import styled, {createGlobalStyle} from 'styled-components';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

export const GlobalStyle = createGlobalStyle`
    body {
        background: url(${toAbsoluteUrl('/media/bg.png')});
        background-position: top center;
        background-size: 100%;
        background-repeat: no-repeat;
        font-size: 16px !important;

        @media only screen and (max-width:899px) {
            height: auto;
            background-size: cover; background-position: 0px;
        }
    }

    input:focus {
        border: 1px solid #F47161 !important;
    }

    input.is-invalid {border-color:#f64e60 !important;}
    .invalid-feedback { margin-top: -10px !important; margin-bottom: 20px !important; font-size: 13px !important; color: #f64e60 !important }

    @media only screen and (max-width:899px) {
        .invalid-feedback { margin-top: 0px !important }
    }

    .modal-backdrop.fade {
        opacity: .7 !important;
    }
`;

export const Container = styled.div`
    @media only screen and (max-width:899px) {
        padding: 0 40px;
    }
`;

export const Header = styled.div`
    padding: 50px 0px;
    position: relative;
`;

export const Logo = styled.div`
    flex-grow: 1;
    img {
        width: 120px;
    }
    @media only screen and (max-width:768px) {
        img {
            width: 100px;
        }                
    }
`;

export const Content = styled.div`
    width: 55%;
    margin: 0 auto;
    display: block;
    h2 { font-size: 39px; letter-spacing: -0.02em; line-height: 54px; text-align: center; color: #091740; margin-bottom: 44px; }
    h2 b { color:#F47161; }
    p { font-size: 20px; letter-spacing: -0.01em; line-height: 32px; text-align: center; color: #091740; opacity: 0.69; margin-bottom: 30px; }

    @media only screen and (max-width:899px) {
        width: 95%;
        margin: 0 auto;
        display: block;
        h2 { font-size: 25px; line-height: 30px; }
        p { font-size: 13px; line-height: 22px; }
    }
`;

export const SearchBar = styled.div`
    position: relative;
    margin-bottom: 50px;

    input { font-size: 16px; height: 66px; border-radius: 50px; background: #fff; box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.04); border:1px solid #f1f1f1; padding: 20px; }
    button { cursor:pointer; border-radius: 100px; background: #f47161; color:#fff; border:none; padding: 10px 40px; position: absolute; right: 10px; top: 11px;} 
    button:hover { background: #D05D4F; }
    @media only screen and (max-width:899px) {
        input { font-size: 14px; padding: 15px; }
        button { position: inherit; width: 50%; margin: 0 auto; display: block; left: 0; right: 0; margin-top: 20px; font-weight: bold;}
    }
`;

export const Footer = styled.div`
 margin: 0 auto; width: 200px; 
 margin-bottom: 50px;
 img { width: 60px; margin: 0 auto; display: block; margin-top: 10px; }
 p { text-align: center; font-size: 10px; margin: 0; padding: 0; text-transform: uppercase; letter-spacing: 2px; opacity: 0.4; }

`;