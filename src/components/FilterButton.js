import React from 'react';

function FilterButton(props) {
    const { label, active, onClick } = props;

    const handleClick = () => onClick(label);

    const buttonStyle = {
        fontWeight: active ? 'bold' : 'normal',
    };

    return (
        <button data-testid="filter-button" onClick={handleClick} style={buttonStyle}>
            {label}
        </button>
    );
}

export default React.memo(FilterButton);
