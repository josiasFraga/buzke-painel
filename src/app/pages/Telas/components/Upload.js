import React, { useRef } from 'react';
import styled from 'styled-components';

const Dragzone = styled.div`
    background-color: #FFF;
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

    const chooseFile = () => {
        inputFile.current.click();
    }

    return (
        <div className="row mb-5">
            <div className="col-xl-12">
                <Dragzone>
                    <i onClick={chooseFile} className="material-icons">cloud_upload</i>
                    <h3 onClick={chooseFile}>Clique aqui para enviar o CNIS</h3>
                    <p>{(props.formik.values.files[0] === undefined ? 'escolha o arquivo' : props.formik.values.files[0].filename)}</p>
                    <input type="file" ref={inputFile} onChange={props.onChooseFile} accept=".pdf" />
                </Dragzone>
            </div>
            <div className="col-xl-12">
                <p>
                    Para sua facilidade, criamos o leitor automático do CNIS.
                </p>
                <p>Para tanto, é necessário importar o arquivo PDF gerado diretamente pelo site do INSS. <a href="https://meu.inss.gov.br/" target="_BLANK">Clique aqui para acessar.</a></p>
                <p>
                    Recomendamos que o usuário realize a devida conferência dos lançamentos gerados pelo sistema.
                </p>
                <p>O usuário também pode realizar inclusão/exclusão manualmente.</p>
            </div>
        </div>
    );
}
