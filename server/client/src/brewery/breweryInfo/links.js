import React from 'react'
import fblogo from './res/facebook.png';
import inlogo from './res/instagram.png';
import twlogo from './res/twitter.png'
import wwwlogo from './res/link.svg';

export default ({brewery})=>{

    const data = [];

    if(brewery.website){
        data.push({type:"website",data:brewery.website,logo:wwwlogo});
    }
    if(brewery.facebook){
        data.push({type:"facebook",data:brewery.facebook,logo:fblogo});
    }
    if(brewery.twitter){
        data.push({type:"twitter",data:brewery.twitter,logo:twlogo});
    }
    if(brewery.instagram){
        data.push({type:"instagram",data:brewery.instagram,logo:inlogo});
    }

    const colSize = 12/data.length;

    var displayLinks = data.map((l=>{
        return (
            <div className={`col-${colSize} mx-auto text-center`} key={l.type}>
                <a href={l.data}><img className="mx-auto" src={l.logo} alt={l.type} width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
            </div>
        );
    }))
    return (
        <>
            <h6 className="card-subtitle mb-4 text-center">Website and Social Media</h6>
            <div className="container-fluid m-0 row mb-4">
            {displayLinks}
            </div>
        </>
    )
}