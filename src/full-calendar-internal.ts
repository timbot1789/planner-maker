import {render, html} from 'lit-html';
import {customElement, property} from 'lit/decorators.js';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {LitElement} from 'lit';

@customElement('full-calendar-internal')
export class FullCalendarInternal extends LitElement {
  @property()
  events = [];

  override connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});

    const template = html` <div id="calendar"></div> `;

    render(template, shadowRoot);

    const calendarEl = shadowRoot.getElementById('calendar') as HTMLElement;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth',
      },
      events: this.events,
    });

    calendar.render();
  }
}
