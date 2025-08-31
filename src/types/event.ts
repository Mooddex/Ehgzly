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


export interface ticket {
  id: number;
  bgGradient: string;
  icon: React.ElementType;
  rating: number;
};
