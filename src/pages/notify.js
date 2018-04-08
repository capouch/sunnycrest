import React from 'react'
import Helmet from 'react-helmet'
import SubscribeButton from '../components/Subscribe'

// Render composite component - Select widget + Subscribe Button

const Notify = (props) => (
  <div>
      <Helmet>
          <title>Notifications - Sunny Crest</title>
          <meta name="description" content="Subscription Page" />
      </Helmet>

      <div id="main" className="alt">
          <section id="one">
              <div className="inner">
                  <header className="major">
                      <h1>Subscribe to important notifications about Sunny Crest</h1>
                  </header>
                  <SubscribeButton />
                  <p>We can notify you about upcoming events, important milestones, etc.  We promise not to pester you!!<br />
                  Click to subscribe or unsubscribe from this service</p>
              </div>
          </section>
      </div>

  </div>
)

export default Notify
