import { getEventById } from "@/app/actions/events";
import NotFound from "@/app/not-found";
import EventC from "@/components/pages/event";

async function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await getEventById(id);

  if (!event) return <NotFound />;

  return <EventC event={event} />;
}

export default EventPage;
