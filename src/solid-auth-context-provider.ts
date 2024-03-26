import {LitElement, html} from 'lit';
import {provide} from '@lit/context';
import { ISolidAuthContext, solidAuthContext } from './solid-auth-context';
import {customElement} from 'lit/decorators.js';
import { EVENTS } from './constants/EVENTS';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-auth-context-provider')
export class SolidAuthContextProvider extends LitElement {

  constructor() {
    super();
    this.addEventListener(EVENTS.UPDATE_OIDC, (e: Event) => {
      this.solidAuthData = {...this.solidAuthData, oidcProvider: (e as CustomEvent).detail}
    });
  }
  @provide({context: solidAuthContext})
  solidAuthData: ISolidAuthContext = {
    oidcProvider: new URL("http://localhost:3000"),
    fetch: globalThis.fetch,
    isLoggedIn: false
  };


  override render() { return html`<slot></slot>`}
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-auth-context-provider': SolidAuthContextProvider;
  }
}
