import React from 'react'

const Contact = (props) => (
    <section id="contact">
        <div className="inner">
            <section>
                { /* Added netlify form foo to form attribute */ }
                <form name="contact" method="post" data-netlify="true" data-netlify-recaptcha="true" netlify-honeypot="bot-field">
                    { /* This is also required for netlify */ }
                    <input class="hidden" name="form-name" value="contact" />
                    <p hidden>
                      <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                    </p>
                    <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message - Let us know how to contact you!!</label>
                        <textarea name="message" id="message" rows="6"></textarea>
                    </div>
                    <ul className="actions">
                        <div data-netlify-recaptcha="true"></div>
                        <li><input type="submit" value="Send Message" className="special" /></li>
                        <li><input type="reset" value="Clear" /></li>
                    </ul>
                </form>
            </section>
            <section className="split">
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-envelope"></span>
                        <h3>Email</h3>
                        <a href="mailto:brianc@independence-church.org?Subject=Email from Sunny Crest" target="_blank">brianc@palaver.net</a>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-phone"></span>
                        <h3>Phone</h3>
                        <span>(212) 655-3084</span>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-home"></span>
                        <h3>Map Search Address</h3>
                        <span>8806 N. SR 71<br />
                        Earl Park, Indiana 47942<br />
                        USA</span>
                    </div>
                </section>
            </section>
        </div>
    </section>
)

export default Contact
