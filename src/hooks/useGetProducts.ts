import productService from '../services/server/product';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const useGetProducts = () => {
  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await productService.getProducts();
    },
  });
  return { isLoading, data, isError, isSuccess };
};
