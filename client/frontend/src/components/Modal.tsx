"use client";
import { useRef, useCallback, ReactNode } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlayRef]
  );
  return (
    <div ref={overlayRef} className="modal" onClick={handleClick}>
      <button
        type="button"
        className="absolute top-2 right-8"
        onClick={onDismiss}
      >
        <Image src="/close.svg" width={15} height={15} alt="close" />
      </button>
      <div ref={wrapperRef} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
}