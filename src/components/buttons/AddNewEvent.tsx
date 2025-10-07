import Link from "next/link";

export default function AddNewEventButton() {
    return(
        <Link href="/events/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
            + Add New
          </button>
        </Link>
    )
}