import {html, LitElement, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar';
import './event-dialog-body.ts';
import './import-calendar-button.ts';
import {EventLdoObj} from './types.js';
import {DIALOG_MODE} from './constants/DIALOG_MODE.js';
import {EventImpl} from '@fullcalendar/core/internal';

@customElement('solid-calendar-internal')
export class SolidCalendarInternal extends LitElement {
  @property()
  events: EventLdoObj[] = [];

  @property()
  commit: (evt: EventImpl, mode: DIALOG_MODE) => void = () => {
    console.error('commit property not defined');
  };

  @state()
  currentSource?: string;

  @state()
  settingSource = false;

  @state()
  calendar?: Calendar;

  @state()
  event?: EventImpl | null;

  @state()
  modeLaunchState: DIALOG_MODE = DIALOG_MODE.create;

  static override styles = css`
    #add-event {
      border: none;
      border-radius: 8px;
      box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
      padding: 0px;
      min-width: 160px;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    const root = this.renderRoot as DocumentFragment;
    const div = document.createElement('div');
    root.append(div);
    this.calendar = new Calendar(div, {
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        iCalendarPlugin,
      ],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth',
      },
      views: {
        dayGridYears: {
          type: 'dayGrid',
          duration: {years: 1},
        },
      },
      events: this.events,
      editable: true,
      selectable: true,
      select: (info) => {
        const root = this.renderRoot as ShadowRoot;
        const dialog = root.getElementById('add-event') as HTMLDialogElement;
        this.event = this.calendar?.addEvent(info);
        this.modeLaunchState = DIALOG_MODE.create;
        dialog.showModal();
      },
      eventClick: (info) => {
        const root = this.renderRoot as ShadowRoot;
        const dialog = root.getElementById('add-event') as HTMLDialogElement;
        this.event = info.event;
        this.modeLaunchState = DIALOG_MODE.view;
        dialog.showModal();
      },
      eventAdd: (addInfo) => {
        this.commit(addInfo.event, DIALOG_MODE.create);
      },
      eventChange: (changeInfo) => {
        if (!changeInfo.oldEvent.extendedProps['@id']) return;
        this.commit(changeInfo.event, DIALOG_MODE.edit);
      },
      eventRemove: (removeInfo) => {
        this.commit(removeInfo.event, DIALOG_MODE.delete);
      },
      eventSourceSuccess: () => {
        // Kick this to the back of the event queue so the events are in the calendar
        if (this.settingSource) {
          setTimeout(() => {
            this.calendar
              ?.getEvents()
              .filter((event) => {
                return event.source?.id === this.currentSource;
              })
              .forEach((event) => this.commit(event, DIALOG_MODE.create));
            this.calendar?.changeView('dayGridMonth');
            this.settingSource = false;
          });
        }
      },
    });

    this.calendar.render();
  }

  private _setSource(id: string) {
    this.currentSource = id;
    this.settingSource = true;
  }

  closeModal() {
    const root = this.renderRoot as ShadowRoot;
    const dialog = root.getElementById('add-event') as HTMLDialogElement;
    this.modeLaunchState = DIALOG_MODE.create;
    dialog.close();
  }

  protected override render() {
    return html`
      <dialog id="add-event">
        <event-dialog-body
          .mode=${this.modeLaunchState}
          .close=${() => this.closeModal()}
          .event=${this.event}
        ></event-dialog-body>
      </dialog>
      <import-calendar-button
        .calendar=${this.calendar}
        .setSource=${(id: string) => this._setSource(id)}
      ></import-calendar-button>
    `;
  }
}
