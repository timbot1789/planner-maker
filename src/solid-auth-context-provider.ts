import {LitElement, html} from 'lit';
import {provide} from '@lit/context';
import {ISolidAuthContext, solidAuthContext} from './solid-auth-context';
import {customElement, state} from 'lit/decorators.js';
import {EVENTS} from './constants/EVENTS';
import {
  login,
  getDefaultSession,
  handleIncomingRedirect,
  fetch,
} from '@inrupt/solid-client-authn-browser';

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
      this.solidAuthData = {
        ...this.solidAuthData,
        oidcProvider: (e as CustomEvent).detail,
      };
    });
    this.addEventListener(EVENTS.LOGIN, () => this._handleLogin());
    this.addEventListener(EVENTS.LOGOUT, () => this._handleLogout());
    handleIncomingRedirect({restorePreviousSession: true}).then(() => {
      const sessionInfo = getDefaultSession().info;
      this.solidAuthData = {
        ...this.solidAuthData,
        ...sessionInfo,
        fetch: fetch,
      };
    });
  }

  @provide({context: solidAuthContext})
  @state()
  solidAuthData: ISolidAuthContext = {
    oidcProvider: new URL('http://localhost:3001'),
    fetch: globalThis.fetch,
    isLoggedIn: false,
  };

  private async _handleLogin() {
    // Start the Login Process if not already logged in.
    if (!getDefaultSession().info.isLoggedIn) {
      if (this.solidAuthData.oidcProvider) {
        login({
          oidcIssuer: this.solidAuthData.oidcProvider.toString(),
          redirectUrl: window.location.href,
          clientName: 'Solid Calendar',
        });
      } else {
        console.error('Cannot log in: No OIDC Provider Set');
      }
    }
  }

  private async _handleLogout() {
    await getDefaultSession().logout({logoutType: 'app'});
    const sessionInfo = getDefaultSession().info;
    this.solidAuthData = {
      ...this.solidAuthData,
      ...sessionInfo,
      fetch: fetch,
    };
  }

  override render() {
    return this.solidAuthData.isLoggedIn
      ? html`<slot name="isLoggedIn"></slot>`
      : html`<slot name="isLoggedOut"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-auth-context-provider': SolidAuthContextProvider;
  }
}
