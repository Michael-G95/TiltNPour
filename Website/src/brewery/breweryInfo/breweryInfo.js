import React from 'react'
import Links from './links'

export default ({ brewery }) => {

    const generateInfoLine = (label, data, testData = null, useTestData = false) => {
        if (useTestData) {
            if (testData!==""){
                return (
                    <>
                        <dt className="col-sm-3">{label}</dt>
                        <dd className="col-sm-9">{data}</dd>
                    </>
                );
            }
            else return null;
        }
        else if (!useTestData && data!==""){
            return (
                <>
                    <dt className="col-sm-3">{label}</dt>
                    <dd className="col-sm-9">{data}</dd>
                </>
            );
        }
        else{
            return null;
        }
    };

    // Create any info items to displat

    // Company
    let tradingNameInfo = generateInfoLine("Trading Name", brewery.trading_as)
    let companyNumberInfo = generateInfoLine("Company No.", brewery.company_number)
    console.log(brewery)
    let companiesHouseUrlInfo = generateInfoLine("Companies House", (<a href={brewery.companies_house_url}>{brewery.company_number}</a>), brewery.companies_house_url,true);
    const noCompanyInfo = tradingNameInfo===null && companyNumberInfo===null && companiesHouseUrlInfo===null;
    
    // Contact
    let emailInfo = generateInfoLine("Email", brewery.email)
    let telephoneInfo = generateInfoLine("Telephone", brewery.telephone)


    return (
        <div className="container-fluid">
            <h4 className="text-center section-title mx-auto pt-5">
                Information
            </h4>


            <div className="card col-12 col-md-12 col-lg-10 col-xl-9 mx-auto mt-3">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">{brewery.name} </h5>
                    <Links brewery={brewery} />
                    {!noCompanyInfo ? (<>
                    <h6 className="card-subtitle mb-4 mt-2 text-center">Company Information</h6>
                    <dl className="card-text row ml-2">
                        {tradingNameInfo}
                        {companyNumberInfo}
                        {companiesHouseUrlInfo}
                    </dl>
                    </>):""}
                    {!noCompanyInfo ? (<>
                    <h6 className="card-subtitle mb-4 mt-2 text-center">Contact Information</h6>
                    <dl className="card-text row ml-2">
                        {emailInfo}
                        {telephoneInfo}
                    </dl>
                    </>):""}
                </div>
            </div>
        </div>
    )
}