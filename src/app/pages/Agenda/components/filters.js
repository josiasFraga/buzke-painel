import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PickerClientes from "../../../components/Forms/Components/Pickers/Clientes";
import Form from 'react-bootstrap/Form';

export function Filters(props) {

    const dispatch = useDispatch();

    const [filterClient, setFilterClient] = useState("");
    const filterCourtServices = props.filterCourtServices;
    const setFilterCourtServices = props.setFilterCourtServices;

    const my_courts_services = useSelector(state => state.app.courts_services);

    useEffect(() => {
        dispatch({type: 'LOAD_COURTS_SERVICES', payload: {params: {tipo: "meus"}}});
    }, []);

    useEffect(() => {
        if (my_courts_services.length > 0) {
            let ids = my_courts_services.map((court_service)=>{
                return court_service.ClienteServico.id;
            });

            setFilterCourtServices({services_ids: ids});
        }
    }, [my_courts_services]);

    useEffect(() => {
        dispatch({type: 'LOAD_SCHEDULES', payload: {params: {type: 1, data: "2022-11-01", cliente_cliente_id: filterClient, ...filterCourtServices}}});

    }, [filterCourtServices, filterClient]);


    return (
        <div className="p-5 row">

            <div className="col-md-12 mb-4">
                <h4>Filtros</h4>
            </div>

            <div className="col-md-12 mb-4">
                <PickerClientes onChange={setFilterClient} value={filterClient} placeholder={"Filtro por cliente"} />
            </div>

            <div className="col-md-12 mb-4">
                <label className="form-label">Quadra/Serviço</label>
                {
                    my_courts_services.map((court_service, index)=>{
                        return (
                                <Form.Check
                                key={index}
                                id={court_service.ClienteServico.id}
                                bsCustomPrefix
                                //custom
                                className="mb-2"
                                >
                                    <Form.Check.Input 
                                        type="checkbox"
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
        </div>
    );
}