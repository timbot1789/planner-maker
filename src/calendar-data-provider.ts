import {LitElement, html, PropertyValueMap} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {
  Container,
  SolidLdoDataset,
  createSolidLdoDataset,
  commitData,
} from '@ldo/solid';
import {v4} from 'uuid';
import './solid-calendar.ts';
import {ISolidAuthContext, solidAuthContext} from './solid-auth-context';
import {EventShShapeType} from './.ldo/event.shapeTypes';

export type SimpleEventObj = {
  title: string;
  start: string;
  end: string;
  extendedProps?: object;
};

@customElement('calendar-data-provider')
export class CalendarDataProvider extends LitElement {
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

  async submitEvent(info: SimpleEventObj) {
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

    event.name = info.title;
    event.type = {'@id': 'Event'};
    event.startDate = info.start;
    event.endDate = info.end;
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

  private _mapToCalendarEvents() {
    return this.calendarContainer?.children().map((child) => {
      const event = this.solidLdo
        ?.usingType(EventShShapeType)
        .fromSubject(child.uri);
      return {
        ...event,
        title: event?.name,
        start: event?.startDate,
        end: event?.endDate,
      };
    });
  }

  override render() {
    return html`<link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
        type="text/css"
      ></link>
      <div>
        ${
          this.loading
            ? ''
            : html`<solid-calendar
                .commit=${(info: SimpleEventObj) => this.submitEvent(info)}
                .events=${this._mapToCalendarEvents()}
              ></solid-calendar>`
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-data-provider': CalendarDataProvider;
  }
}