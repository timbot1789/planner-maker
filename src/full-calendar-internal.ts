import {html, LitElement, css} from 'lit';
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

  @state()
  info?: {startStr: string; endStr: string};

  static override styles = css`
    #add-event {
      border: none;
      border-radius: 8px;
      box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
      padding: 0px;
    }
  `;

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
      select: (info) => {
        const root = this.renderRoot as ShadowRoot;
        const dialog = root.getElementById('add-event') as HTMLDialogElement;
        this.info = info;
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
          .info=${this.info}
        ></event-dialog-body>
      </dialog>
    `;
  }
}
