import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class SolidLogin extends LitElement {
    oidcOptions: URL[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'solid-login': SolidLogin;
    }
}
//# sourceMappingURL=solid-login.d.ts.map