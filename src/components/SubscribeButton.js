import React from "react"
import Link  from "gatsby"
import Helmet from 'react-helmet'

/*
**
**  Component to handle Push Manager subscriptions
*/

// Puzzle for someday: why could I use atob() in the service worker w/o problems?
import b64 from 'base-64'

// Component-global variables
var isSubscribed = false
var swSub, swReg
var label

// This key is made to talk to notifier at www.scene-history.org
const applicationServerPublicKey = 'BJZhZZUqIwbwbGci_pheC3wTwNFcF5btmH7JPCFCF22gk7iJaXmrLznrtBQI_C_HtWZh9BFnwCVKfz7oVgTmaPA'
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);


// Wrap an HTML button into a subscribe buttoncomponent
const buttonStyle = {
  margin: '10px 10px 10px 0'
}

// Button, with a variety of DOM API methods to do notification subscriptions
class SubscribeButton extends React.Component {
  constructor(props) {
    // Assume browser can do push until we learn otherwise
    let supportsPush = true
    super(props);
    label = isSubscribed?'Unsubscribe':'Subscribe'
    // Do we suport local storage?  If so, what about push support?
    if (supports_html5_storage()) {
      supportsPush = (localStorage.getItem('push') != 'false')
      console.log("Local storage push support: " + supportsPush)
    }
    label = supportsPush?'Subscribe':'No browser support'
    this.state = {
      label: label,
      pushSupport: supportsPush
    }
  }

  componentDidMount() {
    // We need context inside promise handler
    let outerThis = this
    // See if browser supports push notifications
    //   Note: Brave lies about this and returns true!!
    //   Also note: we can't do this in constructor; no DOM yet
    if (!('PushManager' in window)) {
      console.log("Push not supported on this browser")
      this.setState({pushSupport: false})
      this.setState({ label: 'No browser support'})
    } else {
      console.log("Browser supports push")
    }
    // Get service worker, then use it to test subscribe status
    //  Note: maybe also check browser compat here??
    console.log('Supports push: ' + this.state.pushSupport)
    // Need the service worker in order to subscribe
    navigator.serviceWorker.getRegistration('/').then(function(registration) {
      swReg = registration
      // We may already know push is not supported
      if (outerThis.state.pushSupport) {
        swReg.pushManager.getSubscription().then(function (subscription) {
          swSub = subscription
          isSubscribed = (swSub != null)
          // Develop mode in Gatsby doesn'twork for service workers
          //   and so lots of debugging was needed
          console.log("Reg object " + swReg)
          console.log("Sub object: " + swSub)
          console.log("Mount check is subscribed: " + isSubscribed)
          // Set label based on subscribe status
          label = isSubscribed?'Unsubscribe':'Subscribe'
          console.log('About to set initial button as ' + label)
          outerThis.setState((state) => ({label: label}))
        })
      }
    })
    // Experimental "feature"
    send_message_to_sw('You old dogface!!')

  }

  // Click handler for Subscribe button
  updateBtn = () =>  {
    // Save context for promise handlers
    var outerThis = this
    // Toggle button; call appropriate handler to sub/unsubscribe
    if (isSubscribed) {
      unsubscribeUser()
        .then(function(subscription) {
          isSubscribed = false
          console.log('Regular unsubscribe ' + subscription)
          label = isSubscribed?'Unsubscribe':'Subscribe'
          outerThis.setState((state) => ({label: label}))
        })
        .catch(function(error) {
          console.log('Error unsubscribing', error);
          isSubscribed = false
          // console.log('In unsubscribe error ' + subscription)
          label = isSubscribed?'Unsubscribe':'Subscribe'
          outerThis.setState((state) => ({label: label}))
        })
      console.log('After unsubscribe ' + isSubscribed)
      } else {
      // Create subscription and send to back end
      subscribeUser()
        .then(function(subscription) {
          // The subscription was successful
          // Should we include error checking for this next function?
          sendSubscriptionToBackEnd(subscription)
          console.log('Service worker subscribed' + JSON.stringify(subscription))
          isSubscribed = true
          // Save for use outside of handler
          swSub = subscription
          console.log('In subscribe ' + isSubscribed)
          label = isSubscribed?'Unsubscribe':'Subscribe'
          outerThis.setState((state) => ({label: label}))
        })
        .catch(function(error) {
          // No good
          isSubscribed = false
          label = 'Unsubscribe'
          outerThis.setState((state) => ({label: label}))
          // These should create modals to report status (soon)
          //   and probably also change page verbiage
          if (Notification.permission === 'denied') {
            // User has not consented to notifications
            console.log('Permission for Notifications was denied');
          } else {
            // Browser won't allow the registration
            console.log('Unable to subscribe to push.', error)
            label = 'No browser support'
            outerThis.setState((state) => ({label: label}))
            outerThis.setState((state) => ({ pushSupport: false} ))
            localStorage.setItem('push', 'false')
          }
        })
      }
    }

  render() {
    return (
      <button
        className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        style={buttonStyle}
        disabled = {!this.state.pushSupport}
        onClick={this.updateBtn}>{this.state.label}</button>
    )
  }
}

function subscribeUser () {
  // Return subscription request promise to caller
  console.log("Subscribe user " + swSub)
  return swReg.pushManager.subscribe(
      {
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
      }
    )
}

function unsubscribeUser () {
  // Return promise to calling function
  console.log ("Unsubscribe user " + swSub)
  return swSub.unsubscribe()
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
  // console.log('Body object: ' + JSON.stringify(bodyObject))

  // This will eventually be sent to a notification microservice
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

// Experimental code
function send_message_to_sw(msg){
    return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();

        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
                console.log(event.data)
            }
        };

        // Send message to service worker along with port for reply
        navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'", [msg_chan.port2]);
    });
}

// Does browser support local storage?
  function supports_html5_storage(){
    try {
        return 'localStorage' in window && window['localStorage'] !== null
    } catch(e) {
        return false;
    }
  }
// For future reference; handles different classes of notification
/*
  // Called for each select/deselect of a topic
	handleSelectChange = (value) => {
		this.setState({ value },function(){
      tagValues = this.state.value
      console.log('Value = ' + this.state.value + ' ' + JSON.stringify(tagValues))
    })
	}
  */

  export default SubscribeButton
