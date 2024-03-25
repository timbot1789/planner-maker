import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * eventContext: JSONLD Context for event
 * =============================================================================
 */
export const eventContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  Event: "http://schema.org/Event",
  Thing: "http://schema.org/Thing",
  organizer: {
    "@id": "http://schema.org/organizer",
  },
  Person: "http://schema.org/Person",
  description: {
    "@id": "http://schema.org/description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  startDate: {
    "@id": "http://schema.org/startDate",
    "@type": "http://www.w3.org/2001/XMLSchema#datetime",
  },
  endDate: {
    "@id": "http://schema.org/endDate",
    "@type": "http://www.w3.org/2001/XMLSchema#datetime",
  },
  attendees: {
    "@id": "http://schema.org/attendees",
  },
  location: {
    "@id": "http://schema.org/location",
  },
  Place: "http://schema.org/Place",
  about: {
    "@id": "http://schema.org/about",
  },
};
