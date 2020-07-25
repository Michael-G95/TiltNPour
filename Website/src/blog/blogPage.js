import React, { useState, useEffect } from 'react'
import { getArticleHtml } from '../dal/dataService';
import { useParams } from 'react-router-dom';
import logger from '../dal/logger';
import './blogCss.css'

const BlogPage = () => {
    const [html, setHtml] = useState("");

    const params = useParams();

    useEffect(() => {
        getArticleHtml(params.article)
            .then((response) => {
                setHtml(response.data);
            })
            .catch((err) => {
                logger.logError(err);
            })
    }, [params])


    if (html.length === 0) {
        return <p>Loading...</p>
    }

    //dangerouslySetInnerHTML={{__html:(html)}}
    return (
        <main className="container-fluid mt-3">
            <div className="container-fluid row col-12 col-xl-10 col-md-12 mx-auto"
                dangerouslySetInnerHTML={{ __html: (html) }}
            >

            </div>
        </main>
    )
}

export default BlogPage