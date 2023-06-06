import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Search() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [query_search, setQuerySearch] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => setQuerySearch(query), 1000);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        dispatch({type: 'LOAD_TABLES', payload: {params: {searchText: query_search}}});
    }, [query_search]);

    return(
        <div className="search">

            <input
                type="text"
                name="search"
                placeholder="Buscar por nome"
                className={"form-control"}
                maxLength={100}
                value={query} 
                onChange={event => setQuery(event.target.value)}
            />
            
        </div>
    )
}