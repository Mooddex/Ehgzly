import UserProfile from "@/components/pages/Profile";

  const mockUser = {
  id: "1",
  photo: "/me.png",
  cover: "/cover.jpg",      // Optional cover image
  name: "Mahmoud Salama",
  username: "mahmouddev",
  email: "ms@gma.com",
  phone: "+20 111 222 3333",
  role: "Frontend Developer",
  location: "Cairo, Egypt",
  joined: "March 2024",
  bio: "Passionate frontend developer who loves building beautiful UI.",
  posts: 12,
  bookings: 4,
  likes: 87,
  linkedin: "https://linkedin.com/in/mahmoudsalama1",
  github: "https://github.com/Mooddex",
};


const ProfilePage = () =>{
    return(
        <div>
            <UserProfile User={mockUser}  />

        </div>
    )
} 
 
export default ProfilePage;