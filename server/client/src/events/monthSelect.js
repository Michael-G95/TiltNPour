import React from 'react';

const MonthSelector = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthButtons = months.map((month) => {
        return (
            <a key={month} href={`/events/${month}`} className="btn btn-outline-dark btn-lg mr-2 border-0" role="button">{month}</a>
        )
    })

    const monthButtonsSmall = months.map((month) => {
        return (
            <a key={month} href={`/events/${month}`} className="dropdown-item text-center" role="button">{month}</a>
        )
    })


    return (
        <>
            <div className="container-fluid mx-auto mx-0 px-0 row d-none d-md-flex">
                <div className="mx-auto">
                    {monthButtons}
                </div>
            </div>
            <div className="container-fluid mx-auto d-flex d-md-none w-75">
                <div className="mx-auto w-100">
                    <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Choose a month
                    </button>
                    <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                        {monthButtonsSmall}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MonthSelector;