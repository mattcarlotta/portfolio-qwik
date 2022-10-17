export type ModalProps = {
  children: any
  description?: string
  id: string
  open: boolean
}

export default function Modal({ children, description, id, open }: ModalProps) {
  return open ? (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[1300]"
      role="presentation"
    >
      {description && (
        <p
          aria-live="polite"
          id="modal-description"
          className="fixed top-0 opacity-0"
        >
          {description}
        </p>
      )}
      <div
        data-title="backdrop"
        className="fixed top-0 right-0 bottom-0 left-0 z-[-1] flex items-center justify-center bg-black"
      />

      <div
        id={id}
        className="h-full"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        aria-modal="true"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  ) : null
}
