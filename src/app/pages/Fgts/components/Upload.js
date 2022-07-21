import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';

const Dragzone = styled.div`
    border: 1px dashed #919191;
    padding: 15px;
    margin-bottom: 20px;

    text-align: center;

    i {
        font-size: 70px;
        color: #484848;
        cursor: pointer;
    }
    i:hover { color: #5e5e5e }

    button {
        width: 220px !important;
    }

    input[type=file] {
        display: none;
    }

    h3 {
        cursor: pointer;
    }
`;

export default function Upload(props) {
    const inputFile = useRef(null);
    const dispatch = useDispatch();

    const chooseFile = () => {
        inputFile.current.click();
    }

    const onChooseFile = (evt) => {
        let file = {
            upload_data: evt.currentTarget.files[0],
            filename: evt.currentTarget.files[0].name,
        };
        props.formik.setFieldValue('files', [file]);

        dispatch({type: 'FGTS_PROCESS', payload: { thesis: props.formik.values.thesis.id, file: evt.currentTarget.files[0] }})
        
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <Dragzone>
                    <i onClick={chooseFile} className="material-icons">cloud_upload</i>
                    <h3 onClick={chooseFile}>Clique aqui para escolher o PDF</h3>
                    <p>{(props.formik.values.files[0] === undefined ? 'escolha o arquivo' : props.formik.values.files[0].filename)}</p>
                    <input type="file" ref={inputFile} onChange={onChooseFile} accept=".pdf" />
                </Dragzone>
            </div>
            <div className="col-xl-12">
                <p>
                    Para sua facilidade, criamos o leitor automático do extrato de fundo de garantia.
                </p>
                <p>Para tanto, é necessário importar o arquivo PDF gerado diretamente pelo site da caixa. <a href="https://acessoseguro.sso.caixa.gov.br/cidadao/auth?response_type=code&client_id=portal-inter&segmento=CIDADAO01&template=portal&redirect_uri=https://acessoseguro.sso.caixa.gov.br/portal/login" target="_BLANK">Clique aqui para acessar.</a></p>
                <p><span style={{color: 'red'}}>**</span> Caso o autor possua mais de um PDF, você pode juntar todos eles em um só, <a target="_BLANK" href="https://www.ilovepdf.com/merge_pdf">clicando aqui.</a></p>
                <p>
                    Recomendamos que o usuário realize a devida conferência dos lançamentos gerados pelo sistema.
                </p>
                <p>O usuário pode realizar inclusão/exclusão manualmente.</p>
            </div>

        </div>
    );
}
