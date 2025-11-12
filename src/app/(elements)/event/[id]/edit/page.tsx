import { getEventById } from "@/app/actions/events";
import NotFound from "@/app/not-found";
import { EditEventForm } from "@/components/forms/EditEventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) return <NotFound />;

  return (
    <div>
      <EditEventForm event={event} />
    </div>
  );
}