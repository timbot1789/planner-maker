import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

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
  submit?: (val: {title: string; start: string; end: string}) => void;

  @property()
  info?: {name: string; start: Date; end: Date};

  static override styles = css`
    #create-event-form {
      display: flex;
      flex-direction: column;
    }
    button {
      float: left;
    }
    #submission {
      float: right;
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
    return html` <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      />
      <form @submit=${this._onSubmit} id="create-event-form">
        <input
          autofocus
          type="description"
          name="title"
          placeholder="Event Title"
        />
        <input type="date" name="startDate" placeholder="Start Date" />
        <input type="date" name="endDate" placeholder="End Date" />
        <div id="action-buttons">
          <button @click=${this?.close}>Close</button>
          <input type="submit" value="Add Event" id="submission" />
        </div>
      </form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'event-dialog-body': EventDialogBody;
  }
}
