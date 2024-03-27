import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {
  Container,
  SolidLdoDataset,
  createSolidLdoDataset,
  commitData,
} from '@ldo/solid';
import {v4} from 'uuid';
import './full-calendar-internal.ts';
import {ISolidAuthContext, solidAuthContext} from './solid-auth-context';
import {EventShShapeType} from './.ldo/event.shapeTypes';

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
  @property()
  solidAuthData?: ISolidAuthContext;

  @property()
  solidLdo?: SolidLdoDataset;

  @property()
  calendarContainer?: Container;

  @state()
  loading = true;

  static override styles = css`
    dl {
      display: grid;
      grid-gap: 4px 16px;
      grid-template-columns: max-content;
    }
    dt {
      font-weight: bold;
    }
    dd {
      margin: 0;
      grid-column-start: 2;
    }
  `;

  private async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    form.reset();

    const message = (formData.get('description') as string | null) || '';
    const startDate = (formData.get('startDate') as string | null) || '';
    const endDate = (formData.get('endDate') as string | null) || '';
    // Don't create a event is main container isn't present
    if (!this.calendarContainer || !this.solidLdo) return;

    // Create event
    const indexResource = this.calendarContainer.child(`event-${v4()}.ttl`);
    // Create new data of type "event" where the subject is the index
    // resource's uri, and write any changes to the indexResource.
    const event = this.solidLdo.createData(
      EventShShapeType,
      indexResource.uri,
      indexResource
    );

    event.name = message;
    event.type = {'@id': 'Event'};
    event.startDate = startDate;
    event.endDate = endDate;
    event.organizer = 'http://localhost:3001/tester2/';
    event.attendees = 'http://localhost:3001/tester2/';
    event.location = 'Boston, MA';
    event.about = 'Thing';
    // The commitData function handles sending the data to the Pod.
    const result = await commitData(event);
    if (result.isError) {
      alert(result.message);
    }
    await this.calendarContainer.read();
    this.requestUpdate();
  }

  private async _initializeCalendarLdo(authData: ISolidAuthContext) {
    const {webId, fetch} = authData;
    if (!webId) return;
    this.solidLdo = createSolidLdoDataset({fetch});

    // We'll start with getting a representation of our WebId's resource
    const webIdResource = this.solidLdo.getResource(webId);

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
    const rootContainer = await webIdResource.getRootContainer();
    if (rootContainer.isError) throw rootContainer;
    const createCalendarContainerResult =
      await rootContainer.createChildIfAbsent('calendar/');
    if (createCalendarContainerResult.isError)
      throw createCalendarContainerResult;
    this.calendarContainer = createCalendarContainerResult.resource;
    await this.calendarContainer.read();
    await Promise.all(
      this.calendarContainer.children().map((child) => child.read())
    );
    this.loading = false;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  protected override updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.get('solidAuthData') && this.solidAuthData?.webId) {
      this._initializeCalendarLdo(this.solidAuthData);
    }
  }

  override render() {
    return html`<link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      ></link>
      <div>
        ${this.loading
          ? ''
          : html`<full-calendar-internal
              .events=${this.calendarContainer?.children().map((child) => {
                const event = this.solidLdo
                  ?.usingType(EventShShapeType)
                  .fromSubject(child.uri);
                return {
                  title: event?.name,
                  start: event?.startDate,
                  end: event?.endDate,
                };
              })}
            ></full-calendar-internal>`}
        <form @submit=${this.onSubmit}>
          <input
            type="description"
            name="description"
            placeholder="Make a event"
          />
          <input type="date" name="startDate" placeholder="Start Date" />
          <input type="date" name="endDate" placeholder="End Date" />
          <input type="submit" value="Post" />
        </form>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'solid-calendar': SolidCalendar;
  }
}
