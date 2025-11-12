import { getEventById } from "@/app/actions/events";
import NotFound from "@/app/not-found";
import EventC from "@/components/pages/event";

async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let event;
  try {
    event = await getEventById(id);
  } catch (error) {
    console.log(error);
    return <NotFound />;
  }
  

  return (
  <EventC event={event} />
  )
    
}

export default EventPage;
