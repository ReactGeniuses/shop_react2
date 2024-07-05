import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ProductSearchBar = () => {
    const [searchById, setSearchById] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [searchParams, setSearchParams] = useSearchParams(); 

    const onSearchByIdChange = (event) => {
        const value = event.target.value;
        setSearchById(value);
    };

    const onSearchByNameChange = (event) => {
        const value = event.target.value;
        setSearchByName(value);
    };

    const onClickHandler = () => {
        const params = new URLSearchParams(searchParams);
        if(searchById){
            params.set('id', searchById);
        } else {
            params.delete('id');
        }
        if(searchByName){
            params.set('name', searchByName);
        } else {
            params.delete('name');
        }
    
        setSearchParams(params);
    };
    
    
    return (
        <Form className="d-flex search-bar">
            <Form.Control
                type="search"
                placeholder="Search Product by ID"
                className="me-2"
                aria-label="Search by ID"
                value={searchById}
                onInput={onSearchByIdChange}
            />
            <Form.Control
                type="search"
                placeholder="Search Product by Name"
                className="me-2"
                aria-label="Search by Name"
                value={searchByName}
                onInput={onSearchByNameChange}
            />
            <Button onClick={onClickHandler} variant="outline-success">Search</Button>
        </Form>
    );
};

export default ProductSearchBar;
