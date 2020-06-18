import React from 'react';

function ErrorPanel(props) {
        return (
            <div className="col-9 mx-auto">
                <h2 className="text-danger">
                    Unable to display due to an error in the application.<br />
                    Please try another brewery or refresh the page.
                </h2>
            </div>
        );
}

export default ErrorPanel;