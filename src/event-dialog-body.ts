import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import {DIALOG_MODE} from './constants/DIALOG_MODE';
import {EventImpl} from '@fullcalendar/core/internal';

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
  submit?: (evt: EventImpl, mode: DIALOG_MODE) => void;

  @property()
  event?: EventImpl;

  @property({reflect: true})
  mode: DIALOG_MODE = DIALOG_MODE.create;

  dialogButtons: {[key in DIALOG_MODE]: TemplateResult | null} = {
    [DIALOG_MODE.view]: html`<paper-icon-button
        icon="create"
        @click=${() => (this.mode = DIALOG_MODE.edit)}
      ></paper-icon-button>
      <paper-icon-button
        icon="delete"
        @click=${() => {
          if (this.event) {
            this.submit?.(this.event, DIALOG_MODE.delete);
            this._close();
          }
        }}
      ></paper-icon-button>`,
    [DIALOG_MODE.edit]: html`<paper-icon-button
        icon="visibility"
        @click=${() => (this.mode = DIALOG_MODE.view)}
      ></paper-icon-button>
      <paper-icon-button
        icon="delete"
        @click=${() => {
          if (this.event) {
            this.submit?.(this.event, DIALOG_MODE.delete);
            this._close();
          }
        }}
      ></paper-icon-button> `,
    [DIALOG_MODE.create]: null,
    [DIALOG_MODE.delete]: null,
  };

  static override styles = css`
    .modal-body {
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

    if (!this.event) {
      this.close?.();
      return;
    }
    this.event.setProp('title', (formData.get('title') as string | null) || '');
    this.event.setStart((formData.get('startDate') as string | null) || '');
    this.event.setEnd((formData.get('endDate') as string | null) || '');
    this.submit?.(this.event, this.mode);
    this._close();
  }

  private _close() {
    this.mode = DIALOG_MODE.view
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
            @click=${() => {
              if (this.mode === DIALOG_MODE.create) this.event?.remove();
              this._close();
            }}
          ></paper-icon-button>
        </span>
        ${this.mode === DIALOG_MODE.view
          ? html`<section class="modal-body">
              <h2>${this.event?.title}</h2>
            </section>`
          : html` <form @submit=${this._onSubmit} class="modal-body">
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
