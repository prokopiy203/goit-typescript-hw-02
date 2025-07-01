import React from "react";
import css from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  children = "Load More",
  ...rest
}) => {
  return (
    <div className={css.buttonBox}>
      <button
        className={css.buttonMore}
        onClick={onClick}
        type="button"
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default LoadMoreButton;
