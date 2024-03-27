import {render, html} from 'lit-html';

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

export class FullCalendarInternal extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});

    const fontStyle = html`
      <style>
        @font-face {
          font-family: 'fcicons';
          src: url('data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALA...AAAAAAAAA=')
            format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      </style>
    `;
    render(fontStyle, this);

    const template = html` <div id="calendar"></div> `;

    render(template, shadowRoot);

    const calendarEl = shadowRoot.getElementById('calendar') as HTMLElement;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth'
      }
    });

    calendar.render();
  }
}

customElements.define('full-calendar-internal', FullCalendarInternal);
