import {LitElement, html} from 'lit';
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
      <form @submit=${this._onSubmit}>
        <input type="description" name="title" placeholder="Make a event" />
        <input type="date" name="startDate" placeholder="Start Date" />
        <input type="date" name="endDate" placeholder="End Date" />
        <input type="submit" value="Post" />
      </form>
      <button autofocus @click=${this?.close}>Close</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'event-dialog-body': EventDialogBody;
  }
}
