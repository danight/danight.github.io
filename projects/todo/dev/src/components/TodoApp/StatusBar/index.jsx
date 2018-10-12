import React from 'react';
import FilterButton from '../../../containers/FilterButton';
import { displayFilters } from '../../../actions/types';
import './index.css';
const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = displayFilters; 

export default function StatusBar() {
    return (
        <div className="status-bar todo-app__status-bar todo-app__item">
            <FilterButton filter={SHOW_ALL}>all</FilterButton>
            <FilterButton filter={SHOW_COMPLETED}>completed</FilterButton>
            <FilterButton filter={SHOW_ACTIVE}>active</FilterButton>
        </div>
    )
}