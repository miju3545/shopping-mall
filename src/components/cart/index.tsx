import React, { useRef, SyntheticEvent, useEffect } from 'react';
import { Cart } from '../../graphql/cart';
import CartItem from './item';

export default function CartList({ items }: { items: Cart[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;

    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>('.cart-item__checkbox');
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      const allChecked = targetInput.checked;
      checkboxes.forEach((inputItem) => {
        inputItem.checked = allChecked;
      });
    } else {
      const isAllChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = isAllChecked;
    }
  };

  useEffect(() => {
    const selectAll = formRef.current?.querySelector<HTMLInputElement>('.select-all');
    const checkboxes = formRef.current?.querySelectorAll<HTMLInputElement>('.cart-item__checkbox');
    selectAll!.checked = true;
    checkboxes?.forEach((inputItem) => (inputItem.checked = true));
  }, [formRef]);

  return (
    <form ref={formRef} onChange={handleCheckboxChanged}>
      <label>
        <input type="checkbox" name="select-all" className="select-all" />
        전체선택
      </label>
      <ul className="cart">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </form>
  );
}
