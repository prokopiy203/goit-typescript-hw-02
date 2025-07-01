import css from "./ImageCard.module.css";

interface ModalData {
  src: string;
  alt: string | null;
}

interface ImageItem {
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

interface ImageCardProps {
  openModal: (data: ModalData) => void;
  item: ImageItem;
}

const ImageCard: React.FC<ImageCardProps> = ({ openModal, item }) => {
  const { urls, alt_description } = item;
  return (
    <div>
      <img
        className={css.imageStyle}
        src={urls.small}
        alt={alt_description ?? undefined}
        width="300"
        height="200"
        onClick={() => openModal({ src: urls.regular, alt: alt_description })}
      />
    </div>
  );
};

export default ImageCard;
