export interface Event {
  id: string;         
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: string;
  category: string;   
  image: string;
}


export interface TicketData {
    id: number;
    title: string;
    subtitle: string;
    date: string;
    time: string;
    location: string;
    price: string;
    category: string;
    rating: number;
    image: string;
    bgGradient: string;
    icon: React.ElementType; 
  }
