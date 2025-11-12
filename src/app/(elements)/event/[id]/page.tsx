import { getEventById } from "@/app/actions/events";
import NotFound from "@/app/not-found";
import EventC from "@/components/pages/event";

export default async function EventPage({ params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) return <NotFound />;

  return <EventC event={event} />;
};