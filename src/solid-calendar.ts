import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {ISolidAuthContext, solidAuthContext} from './solid-auth-context';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-calendar')
export class SolidCalendar extends LitElement {
  /* Note: this script needs to be loaded AFTER the context
   * See: https://github.com/lit/lit/discussions/3302#discussioncomment-6319569
   */
  @consume({context: solidAuthContext, subscribe: true})
  @state()
  solidAuthData?: ISolidAuthContext;

  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
    H  padding: 16px;
      max-width: 800px;
    }
  `;

  override render() {
    return html`<p>Updated New Text $</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-calendar': SolidCalendar;
  }
}
