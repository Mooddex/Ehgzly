import UserProfile from "@/components/pages/Profile";

  const mockUser = { id: "1", photo: "/me.png", name: "Mahmoud",email:"msgma." };

const ProfilePage = () =>{
    return(
        <div>
            <UserProfile User={mockUser}  />

        </div>
    )
} 
 
export default ProfilePage;