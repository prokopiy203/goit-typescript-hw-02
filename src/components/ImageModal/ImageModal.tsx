import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { VscChromeClose } from "react-icons/vsc";
import { ModalImage } from "../../types/types";

const customStyles: Modal.Styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
  },
  content: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    border: "none",
    background: "transparent",
    inset: 0,
    overflow: "visible",
  },
};

Modal.setAppElement("#root");

interface ImageModalProps {
  value: ModalImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ value, isOpen, onClose }) => {
  if (!value) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      appElement={document.getElementById("root") as HTMLElement}
      ariaHideApp={false}
    >
      <img className={css.imageModal} src={value.src} alt={value.alt ?? ""} />
      <button className={css.buttonClose} onClick={onClose}>
        <VscChromeClose />
      </button>
    </Modal>
  );
};
export default ImageModal;
