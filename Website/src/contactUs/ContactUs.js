import React, { useState } from 'react'
import Jumbotron from '../jumbotron'
import fblogo from './res/facebook.png';
import inlogo from './res/instagram.png';
import twlogo from './res/twitter.png'
import { postNewMessage } from '../dal/dataService';
import logger from '../dal/logger';

const ContactUs = () => {

    let [nameValue, setNameValue] = useState("");
    let [emailValue, setEmailValue] = useState("");
    let [messageValue, setMessageValue] = useState("");
    let [confirmedValue, setConfirmedValue] = useState(false);

    const handleOnChangeEvent = (event, setter) => setter(event.target.value);

    const onFormSubmit = () => {

        let missing = []
        if (messageValue.length === 0) {
            alert("Please enter a message!");
            return;
        }
        if (!confirmedValue) {
            alert("Please confirm your understanding!");
            return;
        }

        if (nameValue.length === 0) {
            missing.push("name");
        }
        if (emailValue.length === 0) {
            missing.push("email");
        }

        if (missing.length > 0) {
            if (!window.confirm("Are you sure you want to submit your message without " + (missing.join(", ")) + "?"))
                return;
        }

        const message = {
            name: nameValue.length > 0 ? nameValue : "Anonymous",
            emailcontact: emailValue.length > 0 ? emailValue : "No email contact",
            message: messageValue,
            timestamp: new Date().toString(),
            confirmed: confirmedValue
        }
        console.log(message);
        postNewMessage(message)
            .then(() => {
                alert("Your message has been recieved")
                setNameValue("");
                setEmailValue("");
                setMessageValue("");
                setConfirmedValue(false);
            })
            .catch((err) => {
                logger.logError(err);
                alert("Unable to save your message. Please try again!")
            })
    }
    console.log("CV",confirmedValue)
    return (
        <main className="container-fluid mt-3">
            <Jumbotron title="Contact Us" />
            <div className="container-fluid row col-12 col-md-10 col-lg-8 mx-auto ">
                <div className="col-md-6">
                <h4 className="text-center section-title mx-auto mb-4">
                    Information
                </h4>
                    <p className="paragraph-3">It’s not all about us, we want to hear from you!<br /><br />Have something to say something to our readers?<br /><br />Whether you’re a consumer, brewer, distributor, blogger or even an event organiser our guest blog section allows you to have your say about relatively anything beer related.<br /><br />Please note if you send any content in (via here) we will consider it and if we feel it’s worthwhile for our readers we will put it online.<br /><br />In addition, we may edit certain aspects for readability purposes.</p>

                    <div className="container-fluid mb-3">
                        <a className="link-unstyled" href='https://www.facebook.com'>Follow us on <img src={fblogo} alt="Facebook" width="30" height="30" />&nbsp;&nbsp;&nbsp;</a>
                    </div>
                    <div className="container-fluid mb-3">
                        <a className="link-unstyled" href='https://www.instagram.com'>Follow us on <img src={inlogo} alt="Instagram" width="30" height="30" />&nbsp;&nbsp;&nbsp;</a>
                    </div>
                    <div className="container-fluid mb-3">
                        <a className="link-unstyled" href='https://www.twitter.com'>Follow us on <img src={twlogo} alt="Twitter" width="30" height="30" />&nbsp;&nbsp;&nbsp;</a>
                    </div>
                </div>
                <div className="col-md-6">
                <h4 className="text-center section-title mx-auto mb-4">
                    Submit a message
                </h4>
                    <form action="javascript:void(0);">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter name" value={nameValue} onChange={(e) => handleOnChangeEvent(e, setNameValue)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emailcontact">Email address</label>
                            <input type="email" className="form-control" id="emailcontact" aria-describedby="emailHelp" placeholder="Enter email"
                                value={emailValue} onChange={(e) => handleOnChangeEvent(e, setEmailValue)}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" rows="3" placeholder="I Love Tilt n' Pour..."
                                value={messageValue} onChange={(e) => handleOnChangeEvent(e, setMessageValue)}
                            ></textarea>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="confirmed" value={confirmedValue} onChange={(e) => setConfirmedValue(e.target.checked)} />
                            <label className="form-check-label" htmlFor="confirmed">I understand my message may be shared on this website</label>
                        </div>
                        <button type="button" onClick={() => onFormSubmit()} className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default ContactUs