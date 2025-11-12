import { getEventById } from "@/app/actions/events";
import NotFound from "@/app/not-found";
import { EditEventForm } from "@/components/forms/EditEventForm";

interface EditEventPageProps {
  params: { id: string };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = params;

  const event = await getEventById(id);

  if (!event) return <NotFound />;

  return (
    <div>
      <EditEventForm event={event} />
    </div>
  );
}
