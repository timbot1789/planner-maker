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
@customElement('solid-login-button')
export class SolidLoginButton extends LitElement {
  private _handleLogin() {
    this.dispatchEvent(new CustomEvent(EVENTS.LOGIN, {bubbles: true}));
  }

  override render() {
    return html` <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      />
      <button @click=${this._handleLogin}>Login</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-login-button': SolidLoginButton;
  }
}
