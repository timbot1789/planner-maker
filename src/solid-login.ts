
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-login')
export class SolidLogin extends LitElement {
  @property() oidcOptions = [new URL("http://localhost:3000"), new URL("https://login.inrupt.com"), new URL("https://solidcommunity.net")]

  override render() {
    return html`
      <div>
        <select>
          ${this.oidcOptions.map(option => html`<option value=${option}>${option}</option>`)}
        </select>
        <button style=${this.style}>Login</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-login': SolidLogin;
  }
}
