import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';
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
  event?: EventImpl;

  @property({reflect: true})
  mode: DIALOG_MODE = DIALOG_MODE.create;

  dialogButtons: {[key in DIALOG_MODE]: TemplateResult | null} = {
    [DIALOG_MODE.view]: html`<md-icon-button
        icon="create"
        @click=${() => (this.mode = DIALOG_MODE.edit)}
        ><md-icon>edit</md-icon></md-icon-button
      >
      <md-icon-button
        @click=${() => {
          if (this.event) {
            this.event.remove();
            this._close();
          }
        }}
        ><md-icon>delete</md-icon></md-icon-button
      >`,
    [DIALOG_MODE.edit]: html`<md-icon-button
        @click=${() => (this.mode = DIALOG_MODE.view)}
        ><md-icon>visibility</md-icon></md-icon-button
      >
      <md-icon-button
        @click=${() => {
          if (this.event) {
            this.event.remove();
            this._close();
          }
        }}
        ><md-icon>delete</md-icon></md-icon-button
      > `,
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
    hr {
      border: 0;
      clear: both;
      display: block;
      width: 96%;
      background-color: #000000;
      height: 1px;
    }
  `;

  private _onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    form.reset();

    if (!this.event) {
      this._close();
      return;
    }
    this.event.setProp('title', (formData.get('title') as string | null) || '');
    this.event.setStart((formData.get('startDate') as string | null) || '');
    this.event.setEnd((formData.get('endDate') as string | null) || '');
    this._close();
  }

  private _close() {
    this.close?.();
  }

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      />

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
        rel="stylesheet"
        type="text/css"
      />
      <div id="modal-container">
        <span id="modal-header">
          ${this.dialogButtons[this.mode]}
          <md-icon-button
            id="close-button"
            @click=${() => {
              if (this.mode === DIALOG_MODE.create) this.event?.remove();
              this._close();
            }}
            ><md-icon>close</md-icon></md-icon-button
          >
        </span>
        ${this.mode === DIALOG_MODE.view
          ? html`<section class="modal-body">
              <strong>${this.event?.title}</strong>
              <hr />
              ${this.event?.allDay
                ? html`<p>
                    ${this.event?.start?.toLocaleDateString('en-us', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                    -
                    ${this.event?.end?.toLocaleDateString('en-us', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>`
                : html`<p>
                    ${this.event?.start?.toLocaleDateString('en-us', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <strong>⋅</strong> ${this.event?.start?.toLocaleTimeString(
                      'en-us',
                      {hour: '2-digit', minute: '2-digit'}
                    )}
                    -
                    ${this.event?.end?.toLocaleTimeString('en-us', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>`}
              <p>
                <strong>Organizer:</strong> ${this.event?.extendedProps[
                  'organizer'
                ]}
              </p>
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
                type=${this.event?.allDay ? 'date' : 'datetime-local'}
                name="startDate"
                placeholder="Start Date"
                value=${this.event?.allDay
                  ? this.event?.startStr
                  : this.event?.startStr.split('-', 3).join('-')}
              />
              <input
                type=${this.event?.allDay ? 'date' : 'datetime-local'}
                name="endDate"
                placeholder="End Date"
                value=${this.event?.allDay
                  ? this.event?.endStr
                  : this.event?.endStr.split('-', 3).join('-')}
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
