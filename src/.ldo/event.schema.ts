import {Schema} from 'shexj';

/**
 * =============================================================================
 * eventSchema: ShexJ Schema for event
 * =============================================================================
 */
export const eventSchema: Schema = {
  type: 'Schema',
  shapes: [
    {
      id: 'https://example.com/EventSh',
      type: 'ShapeDecl',
      shapeExpr: {
        type: 'Shape',
        expression: {
          type: 'EachOf',
          expressions: [
            {
              type: 'TripleConstraint',
              predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
              valueExpr: {
                type: 'NodeConstraint',
                values: ['http://schema.org/Event', 'http://schema.org/Thing'],
              },
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/name',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://www.w3.org/2001/XMLSchema#string',
              },
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'name',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value: 'The name of the calendar event ',
                  },
                },
              ],
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/startDate',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://www.w3.org/2001/XMLSchema#dateTime',
              },
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'startDate',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value: 'The time and date at which the event starts. ',
                  },
                },
              ],
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/endDate',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://www.w3.org/2001/XMLSchema#dateTime',
              },
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'endDate',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value: 'The time and date at which the event ends. ',
                  },
                },
              ],
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/location',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://schema.org/Place',
              },
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'location',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value:
                      'The location at which the calendar event will occur. ',
                  },
                },
              ],
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/about',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://schema.org/Thing',
              },
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'about',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value: 'Additional information about the calendar event',
                  },
                },
              ],
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/organizer',
              valueExpr: 'http://schema.org/Person',
              min: 0,
              max: 1,
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'organizer',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value: 'The organizer of the calendar event. ',
                  },
                },
              ],
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/attendees',
              valueExpr: 'http://schema.org/Person',
              min: 0,
              max: -1,
              annotations: [
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
                  object: {
                    value: 'attendees',
                  },
                },
                {
                  type: 'Annotation',
                  predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
                  object: {
                    value: 'The attendees of the calendar event. ',
                  },
                },
              ],
            },
          ],
        },
      },
    },
    {
      id: 'http://schema.org/Person',
      type: 'ShapeDecl',
      shapeExpr: {
        type: 'Shape',
        expression: {
          type: 'EachOf',
          expressions: [
            {
              type: 'TripleConstraint',
              predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
              valueExpr: {
                type: 'NodeConstraint',
                values: ['http://xmlns.com/foaf/0.1/Person'],
              },
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/givenName',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://schema.org/Text',
              },
              min: 0,
              max: 1,
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://schema.org/familyName',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://schema.org/Text',
              },
              min: 0,
              max: 1,
            },
            {
              type: 'TripleConstraint',
              predicate: 'http://xmlns.com/foaf/0.1/name',
              valueExpr: {
                type: 'NodeConstraint',
                datatype: 'http://www.w3.org/2001/XMLSchema#string',
              },
              min: 0,
              max: 1,
            },
          ],
        },
        annotations: [
          {
            type: 'Annotation',
            predicate: 'http://www.w3.org/2000/01/rdf-schema#label',
            object: {
              value: 'Event',
            },
          },
          {
            type: 'Annotation',
            predicate: 'http://www.w3.org/2000/01/rdf-schema#comment',
            object: {
              value:
                'A calendar event, this could be an online meeting or in-person event',
            },
          },
        ],
      },
    },
  ],
};
