import React, { useRef, SyntheticEvent, useEffect, createRef, useState } from 'react';
import { Cart } from '../../graphql/cart';
import CartItem from './item';
import { useDispatch } from 'react-redux';
import { controlCart } from '../../redux/cart';
import PayPreview from './payPreview';

export default function CartList({ items }: { items: Cart[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();
  const dispatch = useDispatch();

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;

    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      const allChecked = targetInput.checked;
      checkboxRefs.forEach((inputItem) => {
        inputItem.current!.checked = allChecked;
      });
    } else {
      const isAllChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = isAllChecked;
    }

    setFormData(data);
  };

  useEffect(() => {
    const selectAll = formRef.current?.querySelector<HTMLInputElement>('.select-all');
    selectAll!.checked = true;
    checkboxRefs?.forEach((inputItem) => (inputItem.current!.checked = true));
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
