import { Dropdown } from 'react-bootstrap';

const SortingDropdown = ({ onSortChange }) => {
    return (
        <Dropdown className="d-inline mx-4 product-sorting">
            <Dropdown.Toggle id="dropdown-autoclose-true">
                Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => onSortChange('name-asc')}>Name (A-Z)</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortChange('name-desc')}>Name (Z-A)</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortChange('price-asc')}>Price (Low to High)</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortChange('price-desc')}>Price (High to Low)</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortChange('date-desc')}>Most Recent</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortChange('popular')}>Popular</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SortingDropdown;