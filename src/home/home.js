import React from 'react';

const Home = ()=>{
    return (
        <main className="container-fluid mt-3">
        <figure className="container-fluid row flex-wrap mx-0">
            <img id="landing" className="col-12" src="./res/beertapoff.svg" height="620px" />
            <figcaption className="mx-auto my-3">NI Beer</figcaption>
        </figure>

        <section className="container-fluid flex-wrap mt-5 px-0">
            <div className="container-fluid">
                <h4 className="text-center section-title mx-auto">
                    Featured Posts
                </h4>
            </div>
            <div className="container-fluid row mx-auto mt-3 justify-content-center">
                <div className="article-picture mx-3 mb-3">

                </div>
                <div className="article-picture mx-3 mb-3">

                </div>
            </div>
        </section>

        <section className="container-fluid flex-wrap mt-5">
            <div className="container-fluid">
                <h4 className="text-center section-title mx-auto">
                    Most Recent
                </h4>
            </div>
            <div className="container-fluid row mx-auto mt-3 justify-content-center">
                <div className="article-picture mx-3 mb-3">

                </div>
                <div className="article-picture mx-3 mb-3">

                </div>
            </div>
        </section>
    </main>
    )
}

export default Home;