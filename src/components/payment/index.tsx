import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux';
import PayPreview from '../paypreview';
import PaymentModal from './modal';
import { controlCart } from '../../redux/cart';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { EXECUTE_PAY } from '../../graphql/payment';

type PayInfo = {
  id: string;
  amount: number;
};

type PayInfos = PayInfo[];

export default function Payment() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [showModal, toggleShowModal] = useReducer((prev) => !prev, false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: executePay } = useMutation((payInfo: PayInfos) =>
    graphqlFetcher(EXECUTE_PAY, payInfo)
  );

  const onProceed = () => {
    // 1. mutation 보내기
    const buyingItems = cart.map(({ id, amount }) => ({
      id,
      amount,
    }));

    executePay(buyingItems);
    // 2. cart state 비우기
    dispatch(controlCart([]));
    navigate('/products', { replace: true });
  };

  const onCancel = () => {
    toggleShowModal();
  };

  return (
    <div>
      <PayPreview handleSubmit={toggleShowModal} submitTitle="결제하기" />
      <PaymentModal
        show={showModal}
        onClose={toggleShowModal}
        onProceed={onProceed}
        onCancel={onCancel}
      />
    </div>
  );
}
