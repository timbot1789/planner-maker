import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {EVENTS} from './constants/EVENTS';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-logout-button')
export class SolidLogoutButton extends LitElement {
  private _handleLogin() {
    this.dispatchEvent(new CustomEvent(EVENTS.LOGOUT, {bubbles: true}));
  }

  override render() {
    return html` <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      ></link>
      <button @click=${this._handleLogin}>Logout</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-logout-button': SolidLogoutButton;
  }
}
