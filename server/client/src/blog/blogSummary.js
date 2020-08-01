import React from 'react'
import { useHistory } from 'react-router-dom'

const BlogSummary = ({article}) => {
    var history = useHistory();

    const handleOnClick = ()=>{
        history.push("/blog/"+article.id);
    }
    return (
        <div className="card mt-4 col-10 col-md-5 mx-2 mx-auto" onClick={handleOnClick}>
            <div className="card-body">
                <h4 className="card-title">{article.title}</h4>
                <div className="card-subtitle text-muted mb-1">
                    {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="card-text mb-2">
                    {article.description}
                </div>
            </div>
        </div>
    )
}

export default BlogSummary