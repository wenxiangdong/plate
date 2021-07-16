import React, { ReactNode, useEffect, useState } from 'react';

export const ToolbarDropdown = ({
  control,
  children,
  onClose,
}: {
  control: ReactNode;
  children: ReactNode;
  onClose?: (ev: MouseEvent) => void;
}) => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listener = (ev: MouseEvent) => {
      if (open) {
        if (referenceElement && ev.composedPath().includes(referenceElement)) {
          return;
        }
        if (popperElement && ev.composedPath().includes(popperElement)) {
          return;
        }

        setOpen(false);
        onClose && typeof onClose === 'function' && onClose(ev);
      }
    };
    document.body.addEventListener('mousedown', listener);
    return () => {
      document.body.removeEventListener('mousedown', listener);
    };
  }, [onClose, open, popperElement, referenceElement, setOpen]);

  return (
    <>
      <div ref={setReferenceElement} onMouseDown={() => setOpen(true)}>
        {control}
      </div>

      <div
        ref={setPopperElement}
        style={{
          position: 'absolute',
          top: '40px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          boxShadow: '0 1px 3px 0 #ccc',
          zIndex: 1,
          display: open ? 'initial' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
};
