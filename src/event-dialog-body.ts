import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import { SimpleEventObj } from './calendar-data-provider';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('event-dialog-body')
export class EventDialogBody extends LitElement {
  @property()
  close?: () => void;

  @property()
  submit?: (evt: SimpleEventObj) => void;

  @property()
  info?: {startStr: string; endStr: string};

  static override styles = css`
    #modal-body {
      display: flex;
      flex-direction: column;
      padding: 8px;
    }
    #close-button {
      float: right;
    }
    #modal-container {
      display: flex;
      flex-direction: column;
    }
    #modal-header {
      width: 100%;
      background-color: #f2f2f2;
    }
  `;

  private _onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    form.reset();

    const title = (formData.get('title') as string | null) || '';
    const start = (formData.get('startDate') as string | null) || '';
    const end = (formData.get('endDate') as string | null) || '';
    this.submit?.({title, start, end});
    this.close?.();
  }

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      />
      <div id="modal-container">
        <span id="modal-header">
          <paper-icon-button
            id="close-button"
            icon="close"
            @click=${this?.close}
          ></paper-icon-button>
        </span>
        <form @submit=${this._onSubmit} id="modal-body">
          <input
            autofocus
            type="description"
            name="title"
            placeholder="Event Title"
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value=${this.info?.startStr}
          />
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value=${this.info?.endStr}
          />
          <input type="submit" value="Add Event" id="submission" />
        </form>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'event-dialog-body': EventDialogBody;
  }
}
