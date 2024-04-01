import {ShapeType} from '@ldo/ldo';
import {eventSchema} from './event.schema';
import {eventContext} from './event.context';
import {EventSh, Person} from './event.typings';

/**
 * =============================================================================
 * LDO ShapeTypes event
 * =============================================================================
 */

/**
 * EventSh ShapeType
 */
export const EventShShapeType: ShapeType<EventSh> = {
  schema: eventSchema,
  shape: 'https://example.com/EventSh',
  context: eventContext,
};

/**
 * Person ShapeType
 */
export const PersonShapeType: ShapeType<Person> = {
  schema: eventSchema,
  shape: 'http://schema.org/Person',
  context: eventContext,
};
