import {ContextDefinition} from 'jsonld';

/**
 * =============================================================================
 * eventContext: JSONLD Context for event
 * =============================================================================
 */
export const eventContext: ContextDefinition = {
  type: {
    '@id': '@type',
  },
  Event: 'http://schema.org/Event',
  Thing: 'http://schema.org/Thing',
  name: {
    '@id': 'http://schema.org/name',
    '@type': 'http://www.w3.org/2001/XMLSchema#string',
  },
  startDate: {
    '@id': 'http://schema.org/startDate',
    '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
  },
  endDate: {
    '@id': 'http://schema.org/endDate',
    '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
  },
  location: {
    '@id': 'http://schema.org/location',
    '@type': 'http://schema.org/Place',
  },
  about: {
    '@id': 'http://schema.org/about',
    '@type': 'http://schema.org/Thing',
  },
  organizer: {
    '@id': 'http://schema.org/organizer',
    '@type': '@id',
  },
  Person: 'http://xmlns.com/foaf/0.1/Person',
  givenName: {
    '@id': 'http://schema.org/givenName',
    '@type': 'http://schema.org/Text',
  },
  familyName: {
    '@id': 'http://schema.org/familyName',
    '@type': 'http://schema.org/Text',
  },
  name2: {
    '@id': 'http://xmlns.com/foaf/0.1/name',
    '@type': 'http://www.w3.org/2001/XMLSchema#string',
  },
  attendees: {
    '@id': 'http://schema.org/attendees',
    '@type': '@id',
    '@container': '@set',
  },
};
