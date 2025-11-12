"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  updateEventAction } from "@/app/actions/events";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {  EditEventSchema, TEditEventSchema } from "@/lib/validators";
import { Event } from "@/types/event";

interface EditEventFormProps {
  event: Event;
}
export const EditEventForm = ({event}:EditEventFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditEventSchema>({
    resolver: zodResolver(EditEventSchema),
    defaultValues:{
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        time: event.time,
        price: event.price,
        category: event.category,
        image: event.image || "",

    }
  });   

  const router = useRouter();

  async function submitHandler(data: TEditEventSchema) {
    try {
      const res = await updateEventAction(event.id, data);

      if (res.success) {
        const name = res.data?.name ?? data.title;
        toast.success(`${name} Updated successfully`);
        router.push(`/event/${res.data?.id}`);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to Updated event");
      }
    } catch (error) {
      console.error("Updating error:", error);
      toast.error("Unexpected error");
    }
  }

  const handleCancel = () => {
    reset(event);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-md mx-auto mb-14 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-black">Update {event.title}</h2>

      <div className="space-y-6">
        {/* Event Title */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("title")}
            type="text"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900
              bg-transparent border-0 border-b-2 border-gray-300 
              focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          <label
            htmlFor="title"
            className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600"
          >
            Event Title
          </label>
        </div>

        {/* Event Description */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            {...register("description")}
            rows={3}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 
              bg-transparent border-0 border-b-2 border-gray-300 
              focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
          <label
            htmlFor="description"
            className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600"
          >
            Event Description
          </label>
        </div>

        {/* Location */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("location")}
            type="text"
            id="location"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 
              bg-transparent border-0 border-b-2 border-gray-300 
              focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
          <label
            htmlFor="location"
            className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600"
          >
            Location
          </label>
        </div>

        {/* Date + Time */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("date")}
              type="date"
              id="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900
                bg-transparent border-0 border-b-2 border-gray-300 
                focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
            <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600">
              Event Date
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("time")}
              type="time"
              id="time"
              className="block py-2.5 px-0 w-full text-sm text-gray-900
                bg-transparent border-0 border-b-2 border-gray-300 
                focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>}
            <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600">
              Event Time
            </label>
          </div>
        </div>

        {/* Price + Category */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("price",{valueAsNumber: true})}
              type="number"
              id="price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900
                bg-transparent border-0 border-b-2 border-gray-300 
                focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
            <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600">
              Price
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              {...register("category")}
              id="category"
              className="block py-2.5 px-0 w-full text-sm text-gray-900
                bg-transparent border-0 border-b-2 border-gray-300 
                focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">Select Category</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              <option value="food">Food & Drink</option>
              <option value="art">Art & Culture</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
            <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:text-blue-600">
              Category
            </label>
          </div>
        </div>

        {/* Image */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("image")}
            type="url"
            id="image"
            className="block py-2.5 px-0 w-full text-sm text-gray-900
              bg-transparent border-0 border-b-2 border-gray-300 
              focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
            top-3 -z-10 origin-[0] peer-focus:text-blue-600">
            Image URL (optional)
          </label>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="text-white bg-blue-700 px-5 py-2.5 rounded-lg"
        >
          Update Event
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="text-white bg-gray-600 px-5 py-2.5 rounded-lg ml-2"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="text-white bg-black px-5 py-2.5 rounded-lg ml-2"
        >
          Back
        </button>
      </div>
    </form>
  );
};
