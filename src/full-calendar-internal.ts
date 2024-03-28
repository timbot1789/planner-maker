import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './event-dialog-body.ts';

@customElement('full-calendar-internal')
export class FullCalendarInternal extends LitElement {
  @property()
  events = [];

  @property()
  commit: (info: {title: string; start: string; end: string}) => void = () => {
    console.error('commit property not defined');
  };

  @state()
  calendar?: Calendar;

  override connectedCallback() {
    super.connectedCallback();
    const root = this.renderRoot as DocumentFragment;
    const div = document.createElement('div');
    root.append(div);
    this.calendar = new Calendar(div, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth',
      },
      events: this.events,
      selectable: true,
      select: () => {
        const root = this.renderRoot as ShadowRoot;
        const dialog = root.getElementById('add-event') as HTMLDialogElement;
        dialog.showModal();
      },
    });

    this.calendar.render();
  }

  closeModal() {
    const root = this.renderRoot as ShadowRoot;
    const dialog = root.getElementById('add-event') as HTMLDialogElement;
    dialog.close();
  }

  submitEvent(info: {title: string; start: string; end: string}) {
    this.calendar?.addEvent(info);
    this.commit?.(info);
  }

  protected override render() {
    return html`
      <dialog id="add-event">
        <event-dialog-body
          .close=${() => this.closeModal()}
          .submit=${(info: {title: string; start: string; end: string}) =>
            this.submitEvent(info)}
        ></event-dialog-body>
      </dialog>
    `;
  }
}
