import EventForm from "../components/EventForm";

const EditEventScreen = ({ route }) => {
  console.log("event details: ", route.params.eventData, route.params.eventId);
  return (
    <EventForm
      creating={false}
      eventData={route.params.eventData}
      eventId={route.params.eventId}
    />
  );
};

export default EditEventScreen;
