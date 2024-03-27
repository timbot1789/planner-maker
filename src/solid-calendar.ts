import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {createSolidLdoDataset} from '@ldo/solid';
import {ISolidAuthContext, solidAuthContext} from './solid-auth-context';
import {EventSh} from './.ldo/event.typings';
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

  @state()
  calendarLdo?: EventSh;

  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
    H  padding: 16px;
      max-width: 800px;
    }
  `;

  private async _initializeCalendarLdo(authData: ISolidAuthContext) {
    const {webId, fetch} = authData;
    if (!webId) return;
    const solidLdoDataset = createSolidLdoDataset({fetch});

    // We'll start with getting a representation of our WebId's resource
    const webIdResource = solidLdoDataset.getResource(webId);

    // This resource is currently unfetched
    console.log(webIdResource.isUnfetched()); // Logs true

    const readResult = await webIdResource.read();

    if (readResult.isError) {
      switch (readResult.type) {
        case 'serverError':
          console.error('The solid server had an error:', readResult.message);
          return;
        case 'noncompliantPodError':
          console.error(
            'The Pod responded in a way not compliant with the spec'
          );
          return;
        default:
          console.error('Some other error was detected:', readResult.message);
      }
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  protected override updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.get('solidAuthData') && this.solidAuthData?.webId) {
      console.log('initializing ldo');
      this._initializeCalendarLdo(this.solidAuthData);
    }
  }

  override render() {
    return html`<p>Updated New Text $</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-calendar': SolidCalendar;
  }
}
