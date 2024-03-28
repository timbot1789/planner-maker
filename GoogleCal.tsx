

import { FunctionComponent,useState } from "react";
import { gapi } from 'gapi-script';

export const GoogleCal: FunctionComponent = () => {
    /* 
      Update with your own Client Id and Api key 
    */

    //ideally wanna create an .env file so that people can easily switch this out
    var CLIENT_ID = "460249272113-1pfd36iteac5idkcf6rto7783tfu4hdh.apps.googleusercontent.com"
    var API_KEY = "AIzaSyD-JbVdwtYPFv161GDH5L92we0oZRV2F3I"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const [numEvents, setNumEvents] = useState("10");
  
    const handleClick = () => {
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3')
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {

          /*
              Uncomment the following block to get events
          */
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': parseInt(numEvents),
            'orderBy': 'startTime'
          }).then((response: { result: { items: any; }; }) => {
            const events = response.result.items
            console.log('EVENTS: ', events)
            let content = document.getElementById("content")
            if (content){
              content.innerHTML = events
            }
            //use variables summary, originalStartTime and end for 3 vars
          })
        })
      })
    }
  
  
    return (
      <div>
          <p id="content">Click to add event to Google Calendar</p>
          <p>Number of Latest Events: </p>
          <input
            type="text"
            placeholder="10"
            value={numEvents}
            onChange={(e) => setNumEvents(e.target.value)}
          />
          <p style={{fontSize: 18}}>Don't forget to add your Client Id and Api key</p>
          <button style={{width: 100, height: 50}} onClick={handleClick}>Show Event</button>
      </div>
    );
  }