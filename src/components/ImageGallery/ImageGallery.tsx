import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export interface ImageItem {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

export type OpenModalFn = (data: { src: string; alt: string | null }) => void;

interface ImageGalleryProps {
  values: ImageItem[];
  openModal: OpenModalFn;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ values, openModal }) => {
  return (
    <ul className={css.listImage}>
      {values.map((item) => (
        <li className={css.listItem} key={item.id}>
          <ImageCard item={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
