import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import PickerClientes from "../../../components/Forms/Components/Pickers/Clientes";
import Form from 'react-bootstrap/Form';

export function Filters(props) {

    const my_courts_services = useSelector(state => state.app.courts_services);
    const setFilterCourtServices = props.setFilterCourtServices;
    const filterCourtServices = props.filterCourtServices;
    const setFilterClient = props.setFilterClient;
    const filterClient = props.filterClient;

    useEffect(() => {
        if (my_courts_services.length > 0) {
            let ids = my_courts_services.map((court_service)=>{
                return court_service.ClienteServico.id;
            });

            setFilterCourtServices({services_ids: ids});
        }
    }, [my_courts_services]);


    return (
        <div className="p-5 row">

            <div className="col-md-12 mb-4">
                <h4>Filtros</h4>
            </div>

            <div className="col-md-12 mb-4">
                <PickerClientes onChange={setFilterClient} value={filterClient} placeholder={"Filtro por cliente"} fieldName={"client_client_id"} />
            </div>

            <div className="col-md-12 mb-4">
                <label className="form-label">Quadra/Serviço</label>
                {
                    my_courts_services.map((court_service, index)=>{
                        return (
                            <Form.Check
                            key={"radio_filtro_servico_" + index}
                            id={"radio_filtro_servico_" + court_service.ClienteServico.id}
                            bsCustomPrefix
                            //custom
                            className="mb-2"
                            type="switch"
                            >
                                <Form.Check.Input 
                                    value={court_service}
                                    name="court_service[]"
                                    checked={filterCourtServices.services_ids.includes(court_service.ClienteServico.id)}
                                    onChange={(e)=>{
                                        let items_checkds = filterCourtServices.services_ids;
                                        if (e.target.checked) {
                                            items_checkds.push(court_service.ClienteServico.id);
                                        } else {
                                            const idx = items_checkds.indexOf(court_service.ClienteServico.id);
                                            items_checkds.splice(idx,1);
                                        }
                                        setFilterCourtServices({services_ids: items_checkds});
                                    }}
                                />
                                <Form.Check.Label>
                                    <div className="check-filter-service-color" style={{ backgroundColor: court_service.ClienteServico.cor }}></div>
                                    {court_service.ClienteServico.nome}
                                </Form.Check.Label>
                            </Form.Check>
                        )
                    })
                }
            </div>

            <div className="col-md-12 mb-4">
                <label className="form-label">Visualização</label>
                <Form.Check
                bsCustomPrefix
                //custom
                className="mb-2"
                >
                    <Form.Check.Input 
                        type="radio"
                        value={"deafult"}
                        checked={props.schedulerView == "default"}
                        onChange={(e)=>{
                            if (e.target.checked) {
                                props.setSchedulerView("default");
                            }
                        }}
                    />
                    <Form.Check.Label>Padrão</Form.Check.Label>
                </Form.Check>

                <Form.Check
                bsCustomPrefix
                //custom
                className="mb-2"
                >
                    <Form.Check.Input 
                        type="radio"
                        value={"deafult"}
                        checked={props.schedulerView == "tabs"}
                        onChange={(e)=>{
                            if (e.target.checked) {
                                props.setSchedulerView("tabs");
                            }
                        }}
                    />
                    <Form.Check.Label>Em Tabs</Form.Check.Label>
                </Form.Check>
            </div>
        </div>
    );
}