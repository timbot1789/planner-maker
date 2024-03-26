import {LitElement} from 'lit';
import {provide} from '@lit/context';
import { SolidAuthContext, solidAuthContext } from './solid-auth-context';
import {customElement} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-auth-context-provider')
export class SolidAuthContextProvider extends LitElement {

  @provide({context: solidAuthContext})
  solidAuthData = new SolidAuthContext();
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-auth-context-provider': SolidAuthContextProvider;
  }
}
