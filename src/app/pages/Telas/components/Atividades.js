import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import { format, parseISO } from 'date-fns';
export default function Atividades(props) {
    const columns = [
        {
            dataField: "company_name",
            text: "ATIVIDADE",
            headerStyle: () => {
                return { width: "40%" };
            },
            formatter: (value, row) => (
                <span style={{cursor: 'pointer'}} onClick={() => props.openFormVinculo(row)}>
                    <i className="flaticon2-edit icon-sm"></i>&nbsp;&nbsp;{value}
                </span>
            ),
        },
        {
            dataField: "start_date",
            text: "DATA DE INÍCIO",
            formatter: (value, row) => (
                <span style={{cursor: 'pointer'}} onClick={() => props.openFormVinculo(row)}>
                    <i className={"flaticon2-edit icon-sm " + (value === '' ? 'text-danger' : '')}></i>&nbsp;&nbsp;{value !== '' ? format(parseISO(value), 'dd/MM/yyyy') : ''}
                </span>
            )
        },
        {
            dataField: "end_date",
            text: "DATA DE FIM",
            formatter: (value, row) => (
                <span style={{cursor: 'pointer'}} onClick={() => props.openFormVinculo(row)}>
                    <i className={"flaticon2-edit icon-sm " + (value === '' ? 'text-danger' : '')}></i>&nbsp;&nbsp;{(value !== '' ? format(parseISO(value), 'dd/MM/yyyy') : '')}
                </span>
            )
        },
        {
            dataField: "activity_type",
            text: "TIPO ATIVIDADE",
            formatter: (value, row) => (
                <span style={{cursor: 'pointer'}} onClick={() => props.openFormVinculo(row)}>
                    <i className="flaticon2-edit icon-sm"></i>&nbsp;&nbsp;{value.name}
                </span>
            )
        },
        {
            dataField: "actions",
            text: "AÇÕES",
            formatter: (value, row) => (
            <>
                <button type="button" onClick={() => props.openContribuicoes(row)} className="btn btn-lightx` btn-sm mr-3">
                    <i className="flaticon-menu-button"></i> Contribuições
                </button>
                <button type="button" onClick={() => props.removerVinculo(row)} className="btn btn-danger btn-sm">
                    <i className="flaticon2-trash"></i> Excluir Vínculo
                </button>
            </>
            ),
            headerStyle: () => {
                return { width: "300px" };
            }
        },
    ];

    return (
        <>
        <div className="row mb-5">
        <div className="col">
            <BootstrapTable
                key={props.formik.values}
                bordered={false}
                classes="table table-striped-blue table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                keyField="id"
                data={props.formik.values.vinculos}
                columns={columns}
            >

            </BootstrapTable>
        </div>
    </div>
    <div className="row mb-5">
        <div className="col d-flex flex-column">
            <button
                type="button"
                className="btn btn-light-primary btn-sm font-weight-bolder font-size-sm py-3 px-6"
                onClick={() => props.openFormVinculo({})}
            >
                <i className="flaticon-plus"></i> Adicionar Vínculo Manualmente
            </button>
        </div>
    </div>
    <div className="row mb-5">
        <div className="col">
            <button type="button" className="btn btn-primary py-3 px-6" onClick={props.calcular}>CALCULAR</button>
            { !props.formik.isValid &&
                <label style={{color: '#F64E60', fontSize: '0.9rem', marginTop: '0.25rem', width: '100%', display: 'block'}}>Para prosseguir, confira todos os campos preenchidos!</label>
            }
        </div>
    </div>
</>
    )
}