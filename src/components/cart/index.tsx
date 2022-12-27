import React, { useRef, SyntheticEvent, useEffect, createRef, useState } from 'react';
import { Cart } from '../../graphql/cart';
import CartItem from './item';
import { useDispatch, useSelector } from 'react-redux';
import { controlCart } from '../../redux/cart';
import PayPreview from './payPreview';
import { RootState } from 'src/redux';

export default function CartList({ items }: { items: Cart[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const setAllCheckedFromItems = (data: FormData) => {
    if (!formRef.current) return;

    const selectedCount = data.getAll('select-item').length;

    const isAllChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = isAllChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputItem) => {
      inputItem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;

    const targetInput = e?.target as HTMLInputElement;
    const data = new FormData(formRef.current);

    if (targetInput && targetInput.classList.contains('select-all')) {
      setItemsCheckedFromAll(targetInput);
    } else {
      setAllCheckedFromItems(data);
    }

    setFormData(data);
  };

  useEffect(() => {
    // const selectAll = formRef.current?.querySelector<HTMLInputElement>('.select-all');
    // selectAll!.checked = true;
    // checkboxRefs?.forEach((inputItem) => (inputItem.current!.checked = true));
    cart.forEach((item) => {
      const $itemRef = checkboxRefs.find((ref) => ref.current!.value === item.id);
      if ($itemRef) $itemRef.current!.checked = true;
    });
    handleCheckboxChanged();
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<Cart[]>((res, ref, i) => {
      if (ref.current!.checked) {
        res.push(items[i]);
      }
      return res;
    }, []);

    dispatch(controlCart(checkedItems));
  }, [items, formData]);

  return (
    <form ref={formRef} onChange={handleCheckboxChanged}>
      <label className="select-all-button">
        <input type="checkbox" name="select-all" className="select-all" /> 전체선택
      </label>
      <ul className="cart">
        {items.map((item, i) => (
          <CartItem key={item.id} item={item} ref={checkboxRefs[i]} />
        ))}
      </ul>
      <PayPreview />
    </form>
  );
}
