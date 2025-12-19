import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../utils/api';

export const useCarData = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select()
        .order('vehicle_category', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
  });
};

export const useUpdateCarAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ vinId, availability }) => {
      const { data, error } = await supabase
        .from('cars')
        .update({ availability })
        .eq('vin_id', vinId);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch cars query
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

export const useCarFilters = (cars = []) => {
  const filterBySearch = (searchValue, searchFilter) => {
    if (!searchValue) return cars;

    switch (searchFilter) {
      case 'none':
        return cars.filter((car) =>
          car.vin_id.toLowerCase().includes(searchValue.key.toLowerCase())
        );
      case 'name':
        return cars.filter((car) =>
          car.vehicle_category
            .toLowerCase()
            .includes(searchValue.key.toLowerCase())
        );
      case 'type':
        return cars.filter((car) =>
          car.car_type.toLowerCase().includes(searchValue.key.toLowerCase())
        );
      case 'brand':
        return cars.filter((car) =>
          car.brand.toLowerCase().includes(searchValue.key.toLowerCase())
        );
      default:
        return cars;
    }
  };

  return { filterBySearch };
};
