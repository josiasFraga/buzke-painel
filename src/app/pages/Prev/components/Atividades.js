import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import { format, parseISO } from 'date-fns';
export default function Atividades(props) {
    const columns = [
        {
            dataField: "company_name",
            text: "VÍNCULO",
            headerStyle: () => {
                return { width: "26%" };
            },
            formatter: (value, row) => (
                <span className="textMin">
                    {value}
                </span>
            ),
        },
        {
            dataField: "start_date",
            text: "INÍCIO",
            formatter: (value, row) => (
                (value !== '' ? format(parseISO(value), 'dd/MM/yyyy') : '')
            )
        },
        {
            dataField: "end_date",
            text: "FIM",
            formatter: (value, row) => (
                (value !== '' ? format(parseISO(value), 'dd/MM/yyyy') : '')
            )
        },
        {
            dataField: "activity_type",
            text: "TIPO",
            formatter: (value, row) => (
                <span onClick={() => props.openFormVinculo(row)}>
                    {value.name}
                </span>
            )
        },
        {
            dataField: "actions",
            text: "",
            formatter: (value, row) => (
            <>
                <button type="button" onClick={() => props.openContribuicoes(row)} className="btn btn-primary mr-3">
                    Contribuições
                </button>
                <button type="button" onClick={() => props.removerVinculo(row)} className="btn btn-danger btnDanger2">
                    <i className="flaticon2-trash"></i>
                </button>
            </>
            ),
            headerStyle: () => {
                return { width: "300px" };
            }
        },
    ];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            if (e.target.type == 'button') return;
            props.openFormVinculo(row);
        }
    };

    return (
        <>
            <div className="row mb-5">
                <div className="col">
                    <BootstrapTable
                        key={props.formik.values}
                        bordered={false}
                        hover={true}
                        classes="table table-vinculos table-striped-blue table-head-custom table-vertical-center overflow-hidden"
                        bootstrap4
                        keyField="id"
                        data={props.formik.values.vinculos}
                        columns={columns}
                        rowEvents={rowEvents}
                    ></BootstrapTable>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col d-flex flex-column">
                    <button
                        type="button"
                        className="btn btn-light-primary btnDefault w100 btn-sm font-weight-bolder font-size-sm py-3 px-6"
                        onClick={() => props.openFormVinculo({})}
                    >
                        <i className="flaticon-plus"></i> Incluir Novo Vínculo
                    </button>
                </div>
            </div>
        </>
    );
}