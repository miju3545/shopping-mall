import React, { SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const $modal = document.getElementById('modal');
  return createPortal(children, $modal!);
};

export default function PaymentModal({
  show,
  onClose,
  onProceed,
  onCancel,
}: {
  show: boolean;
  onClose: () => void;
  onProceed: () => void;
  onCancel: () => void;
}) {
  // if (!show) return null;

  return (
    <ModalPortal>
      <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
        <div className="modal__contents" onClick={(e: SyntheticEvent) => e.stopPropagation()}>
          <p>결제를 진행하시겠습니까?</p>
          <div>
            <button onClick={onProceed}>네</button>
            <button onClick={onCancel}>아니요</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
