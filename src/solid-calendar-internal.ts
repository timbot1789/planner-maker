import {html, LitElement, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './event-dialog-body.ts';
import {SimpleEventObj} from './types.js';
import {DIALOG_MODE} from './constants/DIALOG_MODE.js';

@customElement('solid-calendar-internal')
export class SolidCalendarInternal extends LitElement {
  @property()
  events: SimpleEventObj[] = [];

  @property()
  commit: (evt: SimpleEventObj) => void = () => {
    console.error('commit property not defined');
  };

  @state()
  calendar?: Calendar;

  @state()
  event?: SimpleEventObj;

  @state()
  modeLaunchState: DIALOG_MODE = DIALOG_MODE.create;

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
      editable: true,
      selectable: true,
      select: (info) => {
        const root = this.renderRoot as ShadowRoot;
        const dialog = root.getElementById('add-event') as HTMLDialogElement;
        this.event = {startStr: info.startStr, endStr: info.endStr};
        this.modeLaunchState = DIALOG_MODE.create;
        dialog.showModal();
      },
      eventClick: (info) => {
        const root = this.renderRoot as ShadowRoot;
        const dialog = root.getElementById('add-event') as HTMLDialogElement;
        this.event = {
          startStr: info.event.startStr,
          endStr: info.event.endStr,
          title: info.event.title,
          extendedProps: info.event.extendedProps,
        };
        this.modeLaunchState = DIALOG_MODE.view;
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

  submitEvent(evt: SimpleEventObj) {
    this.calendar?.addEvent(evt);
    this.commit?.(evt);
  }

  protected override render() {
    return html`
      <dialog id="add-event">
        <event-dialog-body
          .mode=${this.modeLaunchState}
          .close=${() => this.closeModal()}
          .submit=${(evt: SimpleEventObj) => this.submitEvent(evt)}
          .event=${this.event}
        ></event-dialog-body>
      </dialog>
    `;
  }
}
