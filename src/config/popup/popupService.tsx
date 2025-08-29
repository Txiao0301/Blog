import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Popup from './index';
import Toast from './Toast';

type PopupOptions = {
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type ToastOptions = {
  message: string;
  duration?: number;
  onClose?: () => void; // 新增
};

let showPopupInner: (options: PopupOptions) => void;
let showToastInner: (options: ToastOptions) => void;

const PopupService: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => () => {});

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOnClose, setToastOnClose] = useState<(() => void) | undefined>();

  showPopupInner = ({ content, onConfirm, onCancel }: PopupOptions) => {
    setContent(content);
    setOnConfirm(() => () => {
      setVisible(false);
      onConfirm && onConfirm();
    });
    setOnCancel(() => () => {
      setVisible(false);
      onCancel && onCancel();
    });
    setVisible(true);
  };

  showToastInner = ({ message, duration = 2000, onClose }: ToastOptions) => {
    setToastMsg(message);
    setToastVisible(true);
    setToastOnClose(() => onClose);
    setTimeout(() => {
      setToastVisible(false);
      if (onClose) onClose();
    }, duration);
  };

  return (
    <>
      <Popup
        showModal={visible}
        content={content}
        confirm={onConfirm}
        cancel={onCancel}
      />
      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
};

// 挂载到页面
export function mountPopupService() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  // For React 18+, use createRoot instead of render
  // @ts-ignore
  (ReactDOM.createRoot ? ReactDOM.createRoot(div).render(<PopupService />) : ReactDOM.render(<PopupService />, div));
}

// 全局调用方法
export function showPopup(options: PopupOptions) {
  if (showPopupInner) showPopupInner(options);
}

export function showToast(options: ToastOptions) {
  if (showToastInner) showToastInner(options);
}