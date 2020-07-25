import React, { useState, useEffect } from 'react'
import {getArticleSummaries} from '../dal/dataService'
import logger from '../dal/logger';
import BlogSummary from './blogSummary';
const BlogHome = () => {
    let [articles,setArticles] = useState([]);
    useEffect(()=>{
        getArticleSummaries()
        .then((response)=>{
            setArticles(response.data);
        })
        .catch((err)=>{
            logger.logError(err);
        })
    },[])


    if(articles.length ===0) 
        return <p>Loading...</p>

    console.log(articles);
    const articleSummaries = articles.map(a=><BlogSummary key={a.id ?? 1} article={a}/>)

    return (
        <main className="container-fluid mt-3">
            <div className="container-fluid row col-12 col-xl-10 col-md-12 mx-auto"
            >
                {articleSummaries}
            </div>
        </main>
    )
}

export default BlogHome