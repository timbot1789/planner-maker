import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {EVENTS} from './constants/EVENTS';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('solid-oidc-selector')
export class SolidOidcSelector extends LitElement {
  @property({type: Array})
  oidcOptions = [];

  private _selectHandler(e: Event) {
    const target = e.target as HTMLSelectElement;
    let val;
    try {
      val = new URL(target.value);
    } catch {
      const evt = new CustomEvent(EVENTS.UPDATE_OIDC, {
        bubbles: true,
        detail: null,
      });
      this.dispatchEvent(evt);
      return;
    }
    const evt = new CustomEvent(EVENTS.UPDATE_OIDC, {
      bubbles: true,
      detail: val,
    });
    this.dispatchEvent(evt);
  }

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      />
      <input type="url" placeholder="Enter OIDC Provider" list="providers" @change=${this._selectHandler} required></input>
      <datalist id="providers">
        ${this.oidcOptions.map(
          (option) => html`<option value=${option}>${option}</option>`
        )}
      </datalist>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-oidc-selector': SolidOidcSelector;
  }
}
