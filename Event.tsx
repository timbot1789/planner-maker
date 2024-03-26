import React, { FunctionComponent, useCallback, useMemo } from "react";
import { ContainerUri, LeafUri } from "@ldo/solid";
import { useLdo, useResource, useSubject } from "@ldo/solid-react";
import { EventShShapeType } from "./src/.ldo/event.shapeTypes";

export const Event: FunctionComponent<{ eventUri: ContainerUri }> = ({
  eventUri,
}) => {
  const eventIndexUri = `${eventUri}index.ttl`;
  const eventResource = useResource(eventIndexUri);
  const event = useSubject(EventShShapeType, eventIndexUri);
  const { getResource } = useLdo();

  //Delete Event
  const deleteEvent = useCallback(async () => {
    const eventContainer = getResource(eventUri);
    await eventContainer.delete();
  }, [eventUri, getResource]);

  if (eventResource.status.isError) {
    return <p>eventResource.status.message</p>;
  }

  return (
    <div>
      <p>{event.name}</p>
      <p>Start Date:{event.startDate}</p>
      <p>End Date:{event.endDate}</p>
      <p>Organizer:{event.organizer}</p>
      <p>Attendees:{event.attendees}</p>
      <p>About:{event.about}</p>
      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
};
