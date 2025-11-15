"use client"
import {user} from "@/types/User"
import Image from "next/image";
interface userProps{
    User:user;
}



export default function UserProfile({User}:userProps) {

   function HandleBioEdit() {
    return(
     <div>
      f
     </div>
    )
    
  } 
    return(
    <section className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-md p-6 text-center">
      {/* Profile Photo */}
      <div className="flex justify-center">
        <Image
          src={User.photo}
          alt={User.name}
          width={100}
          height={100}
          className="border-4 border-blue-500"
        />
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-2xl font-semibold">{User.name}</h2>
      <p className="text-gray-600">{User.email}</p>

      {/* Bio */}
      {User.bio && (
        <p className="mt-2 text-gray-700 text-sm">{User.bio}</p>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-center gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
          Edit Profile
        </button>
        {User.bio ?
         <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition"
         onClick={HandleBioEdit}
         >
          Edit Your Bio
        </button>
        :
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition">
          Add Your Bio
        </button>
        }
       
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition">
          Logout
        </button>
      </div>
    </section>
  );
}
