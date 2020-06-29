import React from 'react';

function Search(props) {
    return (
        <div className={`list-group-item  list-group-item-action d-flex justify-content-between align-items-center brewery-list-item`}>
            <div className="container-fluid">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={props.onChange} value={props.value} />
            </div>
        </div>
    );
}

export default Search;