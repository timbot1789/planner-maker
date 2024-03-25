import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-calendar')
export class SolidCalendar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  override render() {
    return html`
     Updated New Text 
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-calendar': SolidCalendar;
  }
}
