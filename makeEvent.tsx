import React, { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { Container, Leaf, LeafUri } from "@ldo/solid";
import { v4 } from "uuid";
import { useLdo } from "@ldo/solid-react";
import { EventShShapeType } from "./src/.ldo/event.shapeTypes";

export const MakeEvent: FunctionComponent<{ mainContainer?: Container }> = ({
  mainContainer,
}) => {
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [selectedFile, setSelectedFile] = useState<File | undefined>();


  const { createData, commitData } = useLdo();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Don't create a event is main container isn't present
      if (!mainContainer) return;

      // Create the container for the event
      const eventContainerResult = await mainContainer.createChildAndOverwrite(
        `${v4()}/`
      );
      // Check if there was an error
      if (eventContainerResult.isError) {
        alert(eventContainerResult.message);
        return;
      }
      const eventContainer = eventContainerResult.resource;

      // Upload Image
      let uploadedImage: Leaf | undefined;
      if (selectedFile) {
        const result = await eventContainer.uploadChildAndOverwrite(
          selectedFile.name as LeafUri,
          selectedFile,
          selectedFile.type
        );
        if (result.isError) {
          alert(result.message);
          await eventContainer.delete();
          return;
        }
        uploadedImage = result.resource;
      }

      // Create event
      const indexResource = eventContainer.child("index.ttl");
      // Create new data of type "event" where the subject is the index
      // resource's uri, and write any changes to the indexResource.
      const event = createData(
        EventShShapeType,
        indexResource.uri,
        indexResource
      );
      console.log(event)
      // Set the article body
      //event.description.@value = message;
      event.name = message
      if (uploadedImage) {
        // Link the URI to the 
        //event.image = { "@id": uploadedImage.uri };
      }
      // Say that the type is a "SocialMediaeventing"
      event.type = { "@id": "Event" };
      // Add an start date
      event.startDate = startDate
      //event.startDate = {"@id": "DateTime", "@value": "this is an event description"}
      // Add an end date
      event.endDate = endDate
      //add an organizer
      event.organizer = "http://localhost:3001/tester1/"
      event.attendees = ["http://localhost:3001/tester1/","http://solidweb.me/kennethl"]
      event.location = "Boston, MA"
      event.about = "Thing"
      // The commitData function handles sending the data to the Pod.
      const result = await commitData(event);
      if (result.isError) {
        alert(result.message);
      }
    },
    [mainContainer, createData, message, commitData]
  );

  return (
    <form onSubmit={onSubmit}>
      <input
        type="description"
        placeholder="Make a event"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input type="submit" value="Post" />
    </form>
  );
};
