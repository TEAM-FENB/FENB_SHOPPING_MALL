import { fetchCarts } from './carts';
import { CARTS_QUERY_KEY, ADDRESS_QUERY_KEY } from '../constants';
import {
  authQueryKey,
  slidesQueryKey,
  couponsQueryKey,
  filteredProductsQueryKey,
  historyQueryKey,
  productsQueryKey,
  wishListQueryKey,
} from '../constants/queryKey';
import { fetchFavorites } from './favorites';
import {
  checkSignIn,
  fetchSlides,
  fetchCoupons,
  fetchFilteredProducts,
  fetchHistory,
  fetchPageProducts,
  fetchProducts,
  getUserInfo,
} from './index';

export const productsQuery = options => ({
  queryKey: productsQueryKey,
  queryFn: fetchProducts,
  staleTime: 30000,
  ...options,
});

const PAGE_SIZE = 12;

export const pageProductsQuery = (search = 'all') => ({
  queryKey: [...productsQueryKey, search],
  queryFn: ({ pageParam = 1 }) => fetchPageProducts(pageParam, PAGE_SIZE),
  getNextPageParam: (lastPage, allPages) => (lastPage.products.length === PAGE_SIZE ? allPages.length + 1 : undefined),
});

export const filteredProductsQuery = (search, searchValue) => ({
  queryKey: filteredProductsQueryKey(searchValue),
  queryFn: async () => {
    const data = await fetchFilteredProducts(search);
    return data;
  },
});

export const slidesQuery = () => ({
  queryKey: slidesQueryKey,
  queryFn: fetchSlides,
});

export const verifyQuery = () => ({
  queryKey: authQueryKey,
  queryFn: checkSignIn,
  retry: 0,
  staleTime: 3000,
});

export const favoritesQuery = () => ({
  queryKey: wishListQueryKey,
  queryFn: fetchFavorites,
});

export const cartsQuery = options => ({
  queryKey: CARTS_QUERY_KEY,
  queryFn: fetchCarts,
  retry: 0,
  staleTime: 3000,
  ...options,
});

export const userQuery = options => ({
  queryKey: ADDRESS_QUERY_KEY,
  queryFn: getUserInfo,
  retry: 0,
  staleTime: 3000,
  ...options,
});

export const couponsQuery = options => ({
  queryKey: couponsQueryKey,
  queryFn: fetchCoupons,
  retry: 0,
  staleTime: 3000,
  ...options,
});

export const historyQuery = options => ({
  queryKey: historyQueryKey,
  queryFn: fetchHistory,
  retry: 0,
  staleTime: 3000,
  ...options,
});
