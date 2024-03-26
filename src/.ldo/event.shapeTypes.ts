import {ShapeType} from 'ldo';
import {eventSchema} from './event.schema';
import {eventContext} from './event.context';
import {EventSh} from './event.typings';

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
