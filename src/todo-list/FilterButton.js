import React from 'react';

const FilterButton = (props) => {
    const { label, active, onClick } = props;

    const handleClick = () => onClick(label);

    const buttonStyle = {
        fontWeight: active ? 'bold' : 'normal',
    };

    return (
        <button onClick={handleClick} style={buttonStyle}>
            {label}
        </button>
    );
};

export default FilterButton;
