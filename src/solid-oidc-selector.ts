import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { EVENTS } from './constants/EVENTS';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-oidc-selector')
export class SolidOidcSelector extends LitElement {
  @property() oidcOptions = [new URL("http://localhost:3000"), new URL("https://login.inrupt.com"), new URL("https://solidcommunity.net")]

  private _selectHandler(e: Event) {
    const target = e.target as HTMLSelectElement;
    const evt = new CustomEvent(EVENTS.UPDATE_OIDC, {
      bubbles: true,
      detail: target.value,
    })
    console.log("evt", evt);
    this.dispatchEvent(evt);
  }

  override render() {
    return html`
        <select @change=${this._selectHandler}>
          ${this.oidcOptions.map(option => html`<option value=${option}>${option}</option>`)}
        </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-oidc-selector': SolidOidcSelector;
  }
}
