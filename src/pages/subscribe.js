// Module to handle push-notify subscriptions
import React from "react"
import PropTypes from 'prop-types'
import  Link  from "gatsby-link"

// Puzzle for someday: why could I use atob() previously w/o problems?
import b64 from 'base-64'

// This shouldn't be local
var isSubscribed = false
var swSub, swReg
var label

const applicationServerPublicKey = 'BJZhZZUqIwbwbGci_pheC3wTwNFcF5btmH7JPCFCF22gk7iJaXmrLznrtBQI_C_HtWZh9BFnwCVKfz7oVgTmaPA'
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);


// Figure this out after some sleep!
/*
const notifyGroups = ["image", "news", "publish", "program", "meeting"]
const applicationServerPublicKey = 'BJZhZZUqIwbwbGci_pheC3wTwNFcF5btmH7JPCFCF22gk7iJaXmrLznrtBQI_C_HtWZh9BFnwCVKfz7oVgTmaPA'
*/
// Wrap an HTML button into a subscribe buttoncomponent
const buttonStyle = {
  margin: '10px 10px 10px 0'
}

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    label = isSubscribed?'Unsubscribe':'Subscribe'
    this.state = {
      label: label,
      enabled: true
    }
  }

  componentDidMount() {
    let innerThis = this
    navigator.serviceWorker.getRegistration('/').then(function(registration) {
      swReg = registration
      swReg.pushManager.getSubscription().then(function (subscription) {
        swSub = subscription
        isSubscribed = (swSub != null)
        console.log("Reg object " + swReg)
        console.log("Sub object: " + swSub)
        console.log("Mount check is subscribed: " + isSubscribed)
        console.log('Mount curent state of isSubscribed: ' + isSubscribed)
        label = isSubscribed?'Unsubscribe':'Subscribe'
        console.log('Current value of label ' + label)
        console.log('About to set initial button as ' + label)
        innerThis.setState((state) => ({label: label}))
      })
    })

  }

  // Click handler for Subscribe button
  updateBtn = () =>  {
    if (isSubscribed) {
      unsubscribeUser()
      this.setState({label: 'Subscribe'})
    } else {
      // Don't subscribe if no notify groups chosen
      subscribeUser()
      this.setState({label: 'Unsubscribe'})
      }
    }

  render() {
    return (
      <button
        className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        style={buttonStyle}
        onClick={this.updateBtn}>{this.state.label}</button>
    )
  }
}

// Render composite component - Select widget + Subscribe Button
export default class Subscribe extends React.Component {
  constructor(props) {
    super(props);
  }

	propTypes: {
		label: PropTypes.string,
	}
/*
  // Called for each select/deselect of a topic
	handleSelectChange = (value) => {
		this.setState({ value },function(){
      tagValues = this.state.value
      console.log('Value = ' + this.state.value + ' ' + JSON.stringify(tagValues))
    })
	}
  */

  render() {
    return (
      <div>
        <center>
        <SubscribeButton
          />
        </center>
      </div>
    )
  }
}


function subscribeUser () {
  console.log("Subscribe user " + swSub)
  swReg.pushManager.subscribe(
      {
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
      }
    )
    .then(function(subscription) {
      // The subscription was successful
      // subscribeButton.disabled = true;
      // return sendSubscriptionToServer(subscription);
      console.log('Service worked subscribed' + JSON.stringify(subscription))
      sendSubscriptionToBackEnd(subscription)
      isSubscribed = true
    })
    .catch(function(error) {
      if (Notification.permission === 'denied') {
        console.log('Permission for Notifications was denied');
        // subscribeButton.disabled = true;
      } else {
        console.log('Unable to subscribe to push.', error);
        // subscribeButton.disabled = false;
      }
    })
}

function unsubscribeUser () {
  // isSubscribed = false
  console.log ("Unsubscribe user " + swSub)
  swReg.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    // Should this be uncommented?
    // updateSubscriptionOnServer(null);
    console.log('User is unsubscribed.');
    isSubscribed = false;
    // tagValues = ""


    // updateBtn();
  });

}

// Service routine to create Uint8 array for subscribe
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = b64.decode(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Service routine to contact our speciic server
function sendSubscriptionToBackEnd(subscription) {
  // Convert the subscription to a simple object
  let bodyObject = subscription.toJSON()

  // Add selected tags to request object
  // Totally cheating here no so as not to break scene-history server
  let tagList = { tags: ["image"] }
  bodyObject = Object.assign({}, bodyObject, tagList)
  console.log('Body object: ' + JSON.stringify(bodyObject))

  return fetch('https://www.scene-history.org/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }
    // console.log('Subscribe response: ' + JSON.stringify(reponse.data))
    return response.json();
  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
    console.log(JSON.stringify(responseData.data))
  });
}
