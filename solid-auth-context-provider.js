var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { provide } from '@lit/context';
import { solidAuthContext } from './solid-auth-context';
import { customElement } from 'lit/decorators.js';
import { EVENTS } from './constants/EVENTS';
import { login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let SolidAuthContextProvider = class SolidAuthContextProvider extends LitElement {
    constructor() {
        super();
        this.solidAuthData = {
            oidcProvider: new URL("http://localhost:3000"),
            fetch: globalThis.fetch,
            isLoggedIn: false
        };
        console.log("hello");
        this.addEventListener(EVENTS.UPDATE_OIDC, (e) => {
            console.log("update");
            this.solidAuthData = { ...this.solidAuthData, oidcProvider: e.detail };
        });
        this.addEventListener(EVENTS.LOGIN, this._handleLogin);
    }
    async _handleLogin() {
        // Start the Login Process if not already logged in.
        if (!getDefaultSession().info.isLoggedIn) {
            await login({
                oidcIssuer: this.solidAuthData.oidcProvider.toString(),
                redirectUrl: window.location.href,
                clientName: "Solid Calendar"
            });
        }
    }
    render() { return html `<slot></slot>`; }
};
__decorate([
    provide({ context: solidAuthContext })
], SolidAuthContextProvider.prototype, "solidAuthData", void 0);
SolidAuthContextProvider = __decorate([
    customElement('solid-auth-context-provider')
], SolidAuthContextProvider);
export { SolidAuthContextProvider };
//# sourceMappingURL=solid-auth-context-provider.js.map