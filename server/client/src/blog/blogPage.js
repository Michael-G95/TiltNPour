import React, { useState, useEffect } from 'react'
import { getArticleHtml } from '../dal/dataService';
import { useParams, Link } from 'react-router-dom';
import logger from '../dal/logger';

const BlogPage = () => {
    const [html, setHtml] = useState("");

    const params = useParams();

    useEffect(() => {
        getArticleHtml(params.article)
            .then((response) => {
                setHtml(response.data);
                console.log("GOT HTML for article")
            })
            .catch((err) => {
                logger.logError(err);
                console.log(err);
            })
    }, [params])


    if (html.length === 0) {
        return <p className="loading"></p>
    }

    //dangerouslySetInnerHTML={{__html:(html)}}
    return (
        <main className="container-fluid mt-3">
            <div className="container-fluid row col-12 col-xl-10 col-md-12 mx-auto"
                dangerouslySetInnerHTML={{ __html: (html) }}
            >

            </div>
            <Link class="btn btn-secondary ml-3" to="/blog">Back</Link>
        </main>
    )
}

export default BlogPage