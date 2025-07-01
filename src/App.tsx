import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchData from "./service/API";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import toast from "react-hot-toast";
import { Image, ModalImage, SearchParams } from "./types/types";

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    page: 1,
  });
  const [photos, setPhotos] = useState<Image[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<ModalImage | null>(null);

  const handleSearchSubmit = (query: string): void => {
    setSearchParams({ query, page: 1 });
    setPhotos([]);
    setIsEmpty(false);
    setHasMorePhotos(true);
    setError("");
  };

  const loadMore = (): void => {
    setSearchParams((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const openModal = (img: ModalImage): void => {
    setImageModal(img);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const { query, page } = searchParams;
    if (!query) return;

    const getPhotos = async () => {
      setLoading(true);
      setError("");
      setIsEmpty(false);
      try {
        const {
          results: photos,
          total,
          total_pages,
        } = await fetchData(query, page);

        if (total === 0) {
          setIsEmpty(true);
          toast("No results found.");
          return;
        }

        setPhotos((prev) => [...prev, ...photos]);
        setHasMorePhotos(page < total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unidentified error");
        }
      } finally {
        setLoading(false);
      }
    };

    getPhotos();
  }, [searchParams]);

  return (
    <div>
      <SearchBar onSearch={handleSearchSubmit} />

      <ImageGallery images={photos} openModal={openModal} />

      {loading && <Loader />}
      {error && (
        <ErrorMessage
          message="Failed to load images. Please check your connection or try again later."
          error={error || "Unknown error"}
        />
      )}
      {hasMorePhotos && <LoadMoreButton onClick={loadMore} />}
      {imageModal && (
        <ImageModal
          value={imageModal!}
          isOpen={modalIsOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
