import React, { useState, useEffect } from 'react'
import {getArticleSummaries} from '../dal/dataService'
import logger from '../dal/logger';
import BlogSummary from './blogSummary';
import Jumbotron from '../jumbotron';
const BlogHome = () => {
    let [articles,setArticles] = useState([]);
    useEffect(()=>{
        getArticleSummaries()
        .then((response)=>{
            const sortedArticles = response.data.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
              });
            setArticles(sortedArticles.slice(0,6));
        })
        .catch((err)=>{
            logger.logError(err);
        })
    },[])


    if(articles.length ===0) 
        return <p className="loading"></p>

    const articleSummaries = articles.map(a=><BlogSummary key={a.id ?? 1} article={a}/>)

    return (
        <main className="container-fluid mt-3">
            <Jumbotron text="Content is often published relating to beer in Northern Ireland" title="Blog"/>
            <h4 className="text-center section-title mx-auto mt-4">
                    Recent blogs
            </h4>
            <div className="container-fluid row col-12 col-xl-10 col-md-12 mx-auto"
            >
                {articleSummaries}
            </div>
        </main>
    )
}

export default BlogHome