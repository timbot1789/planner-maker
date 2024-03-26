import {LitElement, html} from 'lit';
import {provide} from '@lit/context';
import { ISolidAuthContext, solidAuthContext } from './solid-auth-context';
import {customElement} from 'lit/decorators.js';
import { EVENTS } from './constants/EVENTS';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'

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
    console.log("hello")
    this.addEventListener(EVENTS.UPDATE_OIDC, (e: Event) => {
      console.log("update");
      this.solidAuthData = {...this.solidAuthData, oidcProvider: (e as CustomEvent).detail}
    });
    this.addEventListener(EVENTS.LOGIN, this._handleLogin);
  }

  @provide({context: solidAuthContext})
  solidAuthData: ISolidAuthContext = {
    oidcProvider: new URL("http://localhost:3000"),
    fetch: globalThis.fetch,
    isLoggedIn: false
  };
  
  private async _handleLogin() {
    // Start the Login Process if not already logged in.
    if (!getDefaultSession().info.isLoggedIn) {
      await login({
        oidcIssuer: this.solidAuthData.oidcProvider.toString(),
        redirectUrl: window.location.href,
        clientName: "Solid Calendar"
      });
    }
  }


  override render() { return html`<slot></slot>`}
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-auth-context-provider': SolidAuthContextProvider;
  }
}
