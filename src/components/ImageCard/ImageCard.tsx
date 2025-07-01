import { Image, ModalImage } from "../../types/types";
import css from "./ImageCard.module.css";

interface Props {
  image: Image;
  openModal: (modalImage: ModalImage) => void;
}

const ImageCard: React.FC<Props> = ({
  image: { urls, alt_description, description, links },
  openModal,
}) => {
  return (
    <div>
      <img
        className={css.imageStyle}
        src={urls.small}
        alt={alt_description ?? undefined}
        width="300"
        height="200"
        onClick={() =>
          openModal({
            src: urls.full,
            alt: alt_description ?? null,
            description: description ?? null,
            links,
          })
        }
      />
    </div>
  );
};

export default ImageCard;
