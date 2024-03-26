var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { consume } from '@lit/context';
import { customElement } from 'lit/decorators.js';
import { solidAuthContext } from './solid-auth-context';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let TestContextConsumer = class TestContextConsumer extends LitElement {
    render() {
        return html `<p>This is a test consumer. The value of oidcProvider is ${this.solidAuthData?.oidcProvider}</p>`;
    }
};
__decorate([
    consume({ context: solidAuthContext, subscribe: true })
], TestContextConsumer.prototype, "solidAuthData", void 0);
TestContextConsumer = __decorate([
    customElement('test-context-consumer')
], TestContextConsumer);
export { TestContextConsumer };
//# sourceMappingURL=test-context-consumer.js.map