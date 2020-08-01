import React from 'react'

const Jumbotron = ({title,text}) => {
    return (
        <div className="container-fluid col-12 mx-0">
            <div className="jumbotron">
                <h1 className="display-4 text-center">{title}</h1>
                <p className="lead text-center mt-4">{text}</p>
            </div>
        </div>
    )
}

export default Jumbotron;