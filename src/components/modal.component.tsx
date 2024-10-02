import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title: string;
    actions?: React.ReactNode[]
}

const Modal = ({ isOpen = false, onClose = () => { }, children, title = "", actions }: ModalProps) => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let root = document.getElementById("modal-root");
        if (!root) {
            root = document.createElement("div");
            root.id = "modal-root";
            document.body.appendChild(root);
        }
        setModalRoot(root);

        return () => {
            if (modalRoot) {
                modalRoot.remove();
            }
        };
    }, []);

    if (!isOpen || !modalRoot) return null;

    return createPortal(
        <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose} >
            <div className={`modal-content sm`} onClick={(e: any) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="titleSection">{title}</h3>
                    {/* <VLButton variant="tertiary" onClick={onClose}>
                        <Icon name="Close" ></Icon>
                    </VLButton> */}
                </div>

                {children}
                <div className="modal-footer">
                    {actions}
                </div>
            </div>
        </div>,
        modalRoot
    );
};


export default Modal;