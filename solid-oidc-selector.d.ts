import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class SolidOidcSelector extends LitElement {
    oidcOptions: URL[];
    private _selectHandler;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'solid-oidc-selector': SolidOidcSelector;
    }
}
//# sourceMappingURL=solid-oidc-selector.d.ts.map