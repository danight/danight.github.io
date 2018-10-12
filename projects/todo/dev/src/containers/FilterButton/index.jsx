import React from 'react';
import { connect } from 'react-redux';
import Button from '../../own-components/Button';
import { setDisplayFilter } from '../../actions';

let FilterButton = function({ active, onClick, children }) {
    return (
        <Button
            disabled={active}
            onClick={onClick}
            className="status-bar__button"
        >
            {children}
        </Button>
    )
}

const mapStateToProps = ({displayFilter}, {filter}) => {
    return {
        active: displayFilter === filter
    }
}

const mapDispatchToProps = (dispatch, {filter}) => {
    return {
        onClick: () => dispatch( setDisplayFilter(filter) )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterButton);