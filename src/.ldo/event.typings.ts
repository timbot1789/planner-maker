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
   * The organizer of the calander event.
   */
  organizer: string;
  /**
   * The name of the calander event
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
   * The attendees of the calander event.
   */
  attendees?: string[];
  /**
   * The location at which the calander event will occur.
   */
  location: string;
  /**
   * Additional information about the calander event
   */
  about: string;
}
