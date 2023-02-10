import { PropsWithJsxChildren } from "@/shared";

export function ModalBody({ children }: PropsWithJsxChildren) {
  return <div className="text-lg text-stroke">{children}</div>;
}

export function ModalFooter({ children }: PropsWithJsxChildren) {
  return <div className="mt-auto flex justify-end gap-4">{children}</div>;
}

export interface ModalProps {
  isShown: boolean;
  children: JSX.Element | JSX.Element[];
}

export function Modal({ isShown, children }: ModalProps) {
  return (
    <div
      className={`fixed top-0 left-0 flex h-full w-full items-center justify-center bg-stroke p-4 transition ${
        isShown ? "bg-opacity-75" : "pointer-events-none bg-opacity-0"
      }`}
    >
      <div
        className={`flex flex-col gap-8 rounded-lg bg-white p-8 text-center font-semibold shadow-lg shadow-slate-600 transition-[opacity,transform] ${
          isShown ? "" : "scale-90 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

Modal.Footer = ModalFooter;
Modal.Body = ModalBody;
