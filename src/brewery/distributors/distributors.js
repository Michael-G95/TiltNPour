import React from 'react';

function Distributors(props) {

    const distributors = props.distributors.map(d => {
        return (
            <li key={d.id} className="list-group-item text-center">
                {d.name ? <>{d.name}<br /></> :""} 
                {d.contact1 ? <>{d.contact1}<br /></> :""}
                {d.contact2 ? <>{d.contact2}<br /></> :""}
                {d.address ? <>{d.address}<br /></> :""}
            </li>
        )
    })
    return (
        <div className="container-fluid">
            <h4 className="text-center section-title mx-auto pt-5">
                Distributors
        </h4>
            <ul className="list-group list-group-flush">
                {distributors}
            </ul>
        </div>


    )
}

export default Distributors;