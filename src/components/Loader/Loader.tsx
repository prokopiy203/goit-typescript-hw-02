import React from "react";
import { BeatLoader } from "react-spinners";
import css from "./Loader.module.css";

interface LoaderProps {
  loading?: boolean;
  color?: string;
  size?: number | string;
  margin?: number | string;
}

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  color = "white",
  size = undefined,
  margin = undefined,
}) => {
  return (
    <div className={css.backdrop}>
      <BeatLoader
        loading={loading}
        color={color}
        size={size}
        margin={margin}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loader;
