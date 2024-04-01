import {ContextDefinition} from 'jsonld';

/**
 * =============================================================================
 * Typescript Typings for event
 * =============================================================================
 */

/**
 * EventSh Type
 */
export interface EventSh {
  '@id'?: string;
  '@context'?: ContextDefinition;
  type:
    | {
        '@id': 'Event';
      }
    | {
        '@id': 'Thing';
      };
  /**
   * The name of the calendar event
   */
  name: string;
  /**
   * The time and date at which the event starts.
   */
  startDate: string;
  /**
   * The time and date at which the event ends.
   */
  endDate: string;
  /**
   * The location at which the calendar event will occur.
   */
  location: string;
  /**
   * Additional information about the calendar event
   */
  about: string;
  /**
   * The organizer of the calendar event.
   */
  organizer?: Person;
  /**
   * The attendees of the calendar event.
   */
  attendees?: Person[];
}

/**
 * Person Type
 */
export interface Person {
  '@id'?: string;
  '@context'?: ContextDefinition;
  type: {
    '@id': 'Person';
  };
  givenName?: string;
  familyName?: string;
  name2?: string;
}
