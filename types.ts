type StatesType = {
  value: string;
  key: string;
};

type CityType = {
  id: string;
  name: string;
  state: string;
};

type PropertyType = {
  id: string;
  title: string;
  user_id: string;
  images: Array<string>;
  description?: string;
  price: number;
  state: string;
  city: string;
  created_at: string;
  type: number;
  isSaved?: boolean;
};
