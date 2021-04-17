import { Restaurant } from '../@types/types';
import api from '../infra/api';

export async function getRestaurant(name: string): Promise<Restaurant> {
  const response = await api.get<Restaurant>(`/restaurant/${name}`);

  return response.data;
}
