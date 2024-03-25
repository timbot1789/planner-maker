var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let SolidLogin = class SolidLogin extends LitElement {
    constructor() {
        super(...arguments);
        this.oidcOptions = [new URL("http://localhost:3000"), new URL("https://login.inrupt.com"), new URL("https://solidcommunity.net")];
    }
    render() {
        return html `
      <div>
        <select>
          ${this.oidcOptions.map(option => html `<option value=${option}>${option}</option>`)}
        </select>
        <button style=${this.style}>Login</button>
      </div>
    `;
    }
};
__decorate([
    property()
], SolidLogin.prototype, "oidcOptions", void 0);
SolidLogin = __decorate([
    customElement('solid-login')
], SolidLogin);
export { SolidLogin };
//# sourceMappingURL=solid-login.js.map