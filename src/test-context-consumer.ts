import {LitElement, html} from 'lit';
import { consume } from '@lit/context';
import {customElement} from 'lit/decorators.js';
import { ISolidAuthContext, solidAuthContext } from './solid-auth-context';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('test-context-consumer')
export class TestContextConsumer extends LitElement {

  @consume({context: solidAuthContext, subscribe: true })
  solidAuthData?: ISolidAuthContext;

  override render() {
    return html`<p>This is a test consumer. The value of oidcProvider is ${this.solidAuthData?.oidcProvider}</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-context-consumer': TestContextConsumer;
  }
}
