import Env from "./config/Env";
import { citiesList } from "./config/cities";
import moment from "moment";

export const getCities = (state: string): Array<CityType> | [] => {
  const stateCities = citiesList.filter((city) => city.state == state);
  return stateCities;
};

export const bytesToMb = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

// * Get Image full url
export const getImageUrl = (path: string): string => {
  return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${path}`;
};

// * Format dates
export const formatDate = (date: string): string => {
  return moment(date).format("DD-MM-YYYY");
};
