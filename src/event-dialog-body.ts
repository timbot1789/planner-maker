import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import {SimpleEventObj} from './calendar-data-provider';
import {DIALOG_MODE} from './constants/DIALOG_MODE';

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
  event?: SimpleEventObj;

  @property({reflect: true})
  mode: DIALOG_MODE = DIALOG_MODE.create;

  dialogButtons: {[key in DIALOG_MODE]: TemplateResult | null} = {
    [DIALOG_MODE.view]: html`<paper-icon-button
      icon="create"
      @click=${() => (this.mode = DIALOG_MODE.edit)}
    ></paper-icon-button>`,
    [DIALOG_MODE.edit]: html`<paper-icon-button
      icon="visibility"
      @click=${() => (this.mode = DIALOG_MODE.view)}
    ></paper-icon-button>`,
    [DIALOG_MODE.create]: null,
  };

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
    const startStr = (formData.get('startDate') as string | null) || '';
    const endStr = (formData.get('endDate') as string | null) || '';
    this.submit?.({title, startStr, endStr});
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
          ${this.dialogButtons[this.mode]}
          <paper-icon-button
            id="close-button"
            icon="close"
            @click=${this?.close}
          ></paper-icon-button>
        </span>
        ${this.mode === DIALOG_MODE.view
          ? html`<section>
              <h2>${this.event?.title}</h2>
            </section>`
          : html` <form @submit=${this._onSubmit} id="modal-body">
              <input
                autofocus
                type="description"
                name="title"
                placeholder="Event Title"
                value=${this.event?.title}
              />
              <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value=${this.event?.startStr}
              />
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value=${this.event?.endStr}
              />
              <input
                type="submit"
                value="${this.mode === DIALOG_MODE.create
                  ? 'Add'
                  : 'Update'} Event"
                id="submission"
              />
            </form>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'event-dialog-body': EventDialogBody;
  }
}
