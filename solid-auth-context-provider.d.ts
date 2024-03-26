import { LitElement } from 'lit';
import { ISolidAuthContext } from './solid-auth-context';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class SolidAuthContextProvider extends LitElement {
    constructor();
    solidAuthData: ISolidAuthContext;
    private _handleLogin;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'solid-auth-context-provider': SolidAuthContextProvider;
    }
}
//# sourceMappingURL=solid-auth-context-provider.d.ts.map