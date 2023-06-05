import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Search(props) {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [query_search, setQuerySearch] = useState("");
    const product_id = props.product_id;

    useEffect(() => {
        const timeOutId = setTimeout(() => setQuerySearch(query), 1000);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        dispatch({type: 'LOAD_PRODUCT_ADITIONALS', payload: {params: {produto_id: product_id,searchText: query_search}}});
    }, [query_search]);

    return(
        <div className="search">

            <input
                type="text"
                name="search"
                placeholder="Buscar adicional nome"
                className={"form-control"}
                maxLength={100}
                value={query} 
                onChange={event => setQuery(event.target.value)}
            />
            
        </div>
    )
}