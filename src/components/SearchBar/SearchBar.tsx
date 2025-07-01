import React, { FormEvent } from "react";
import { CiSearch } from "react-icons/ci";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("input") as HTMLInputElement;

    const value = input.value.trim();
    if (!value) {
      toast.error("This didn't work.");
      return;
    }

    onSearch(value);
    form.reset();
  };

  return (
    <div className={css.boxSearch}>
      <form onSubmit={handleSubmit} className={css.inputBox}>
        <input
          className={css.input}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.buttonSearch}>
          <CiSearch className={css.svgSearch} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
