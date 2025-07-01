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
import { Data, Image, ModalImage, SearchParams } from "./types/types";

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    page: 1,
  });
  const [photos, setPhotos] = useState<Image[]>([]);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<ModalImage | null>(null);

  const handleSearchSubmit = (query: string): void => {
    setSearchParams({ query, page: 1 });
    setPhotos([]);
    setError(null);
    setHasMorePhotos(false);
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
      setError(null);
      try {
        const response = await fetchData(query, page);
        const data: Data = response.data;

        if (data.total === 0) {
          toast("No results found.");
          return;
        }

        setPhotos((prev) => [...prev, ...data.results]);
        setHasMorePhotos(page < data.total_pages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("НUnidentified error "));
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

      <ImageGallery values={photos} openModal={openModal} />

      {loading && <Loader />}
      {error && (
        <ErrorMessage message={`Something is wrong: ${error.message}`} />
      )}
      {hasMorePhotos && <LoadMoreButton onClick={loadMore} />}
      <ImageModal
        value={imageModal!}
        isOpen={modalIsOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
