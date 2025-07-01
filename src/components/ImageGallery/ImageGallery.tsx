import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image, ModalImage } from "../../types/types";

interface Props {
  images: Image[];
  openModal: (modalImage: ModalImage) => void;
}

const ImageGallery: React.FC<Props> = ({ images, openModal }) => {
  return (
    <ul className={css.listImage}>
      {images.map((image) => (
        <li className={css.listItem} key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
