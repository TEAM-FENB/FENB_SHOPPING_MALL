import { useGenericMutation } from '../index';
import { removeCart } from '../../api/fetch';
import { CARTS_QUERY_KEY } from '../../constants';

const useRemoveCartMutation = () =>
  useGenericMutation({
    queryKey: CARTS_QUERY_KEY,
    mutationFn: removeCart,
    onMutate({ id, selectedSize }) {
      return carts => carts.filter(cart => cart.id !== id || cart.selectedSize !== selectedSize);
    },
  });

export default useRemoveCartMutation;
