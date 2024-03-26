import { LitElement } from 'lit';
import { ISolidAuthContext } from './solid-auth-context';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class TestContextConsumer extends LitElement {
    solidAuthData?: ISolidAuthContext;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'test-context-consumer': TestContextConsumer;
    }
}
//# sourceMappingURL=test-context-consumer.d.ts.map