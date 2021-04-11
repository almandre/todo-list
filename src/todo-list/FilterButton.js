import React from 'react';

export default class FilterButton extends React.PureComponent {
    handleClick = () => this.props.onClick(this.props.label);

    render() {
        const buttonStyle = {
            fontWeight: this.props.active ? 'bold' : 'normal',
        };

        return (
            <button onClick={this.handleClick} style={buttonStyle}>
                {this.props.label}
            </button>
        );
    }
}