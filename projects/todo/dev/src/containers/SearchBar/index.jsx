import React from 'react';
import { connect } from 'react-redux';
import { setFinderText } from '../../actions';
import Input from '../../own-components/Input';

function SearchBar({ todos, onChange }) {
    return (
        <React.Fragment>
            {todos.length > 1 ?
                <div className="searchbar todo-app__searchbar todo-app__item">
                    <Input
                        type="text"
                        placeholder="searh todo by text..."
                        onChange={({ target: { value }}) => {
                            onChange(value.trim());
                        }}
                    />
                </div>
                : 
                null
            }
        </React.Fragment>
    )
}

const mapStateToProps = ({ todos }) => ({ todos });
const mapDispatchToProps = (dispatch) => { 
    return {
        onChange: text => dispatch( setFinderText(text) )
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);