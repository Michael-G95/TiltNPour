import React from 'react'
import Jumbotron from '../jumbotron';

const AboutUs = () => {
    return (
        <main className="container-fluid mt-3">
            <Jumbotron title="About Us" />
            <div className="container-fluid row">
                <div className="col-md-6 mx-auto footer-img">
                    Image Placeholder
                </div>
                <div className="col-md-6">
                    <div className="col-lg-10 mx-auto text-left">
                        <p>Originally established in 2013 as BelfastBeerBlog, which
                    aimed to bring members of the developing NI beer scene together through reviews, insights and promotion of local events. </p>

                        <p>As with anything over the years, projects develop, take different directions &amp; industry evolves; and that is exactly the case here for BelfastBeerBlog.&nbsp;</p>

                        <p>Since 2013 we have seen a huge growth in the sector, with rapid expansion of breweries, demand increasing across the country and huge interest from macro companies. With this in mind, having the blog somewhat localised within the Belfast area wasn’t far enough for what we wanted to create.</p>
                        <p>Belfast is still in our eyes the key to development of the NI Beer Scene, but it isn’t the only city, town or village, this is where Tilt n’ Pour evolved from.</p>
                    </div>
                </div>
            </div>

            <div className="container-fluid row">
            <div className="col-md-6 mx-auto text-center footer-img my-4">
                    Image Placeholder
                </div>
            </div>
            
            <div className="container-fluid row">
                < div className="col-md-6" />
                <div className="col-md-6">
                    <div className="col-lg-10 mx-auto text-left">
                        <p>Tilt n’ Pour aims to highlight more of how the industry works, uncovering stories &amp; insight from those working in it, educating ourselves further across the journey and aiding in reducing the gap between the consumer &amp; producer whilst continuously building the local beer community.</p><p>&zwj;</p><p>Come join us, grab a beer &amp; follow the madness. </p>
                    </div>
                </div>
            </div>




        </main>
    )
}

export default AboutUs;