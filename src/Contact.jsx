import { useEffect, useRef } from "react";
import { whatsappUrl } from "./data";

export function WhatsLink({ product, children, className = "", ...props }) {
  return <a className={className} href={whatsappUrl(product)} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

export function useDialog(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const focused = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const close = () => onClose();
    dialog.addEventListener("cancel", close);
    return () => {
      dialog.removeEventListener("cancel", close);
      dialog.close();
      document.body.style.overflow = overflow;
      if (focused?.isConnected) focused.focus();
    };
  }, []);
  return ref;
}
