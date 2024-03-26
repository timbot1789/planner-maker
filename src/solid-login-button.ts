import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-login-button')
export class SolidLoginButton extends LitElement {

  override render() {
    return html`<button>Login</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-login-button': SolidLoginButton;
  }
}
