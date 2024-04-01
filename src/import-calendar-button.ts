import {Calendar} from '@fullcalendar/core';
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {v4} from 'uuid';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('import-calendar-button')
export class ImportCalendarButton extends LitElement {
  @property()
  calendar?: Calendar;

  @property()
  setSource?: (id: string) => void;

  private _importCalendar() {
    const root = this.renderRoot as ShadowRoot;
    const input = root.querySelector('input');
    if (!input?.files || input.files.length < 1) return;
    this.calendar?.changeView('dayGridYears');
    const file = input.files[0];
    const sourceUrl = URL.createObjectURL(file);
    const sourceId = v4();
    this?.setSource?.(sourceId);
    this.calendar?.addEventSource({
      url: sourceUrl,
      format: 'ics',
      id: sourceId,
    });
    input.value = '';
  }

  override render() {
    return html` <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      ></link>
      <label for="calendarImport" style="margin-top: 8px">Import Calendar:
        <input type="file" id="calendarUpload" accept=".ics, text/calendar" @change=${this._importCalendar}></input>
      </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'import-calendar-button': ImportCalendarButton;
  }
}
