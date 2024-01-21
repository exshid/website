import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline, IoArrowForward } from "react-icons/io5";

const SearchModal = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (searchModal) {
      document.getElementById("searchModal").focus();
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          setSearchModal(false);
          return (
            <Link href={`/search/${input}`}>
              <a>Search</a>
            </Link>
          );
        }
        if (e.key === "Escape") {
          setSearchModal(false);
        }
      });
    }    
  });
  return (
    <div className={`search-modal px-3 w-full h-full ${searchModal ? "open" : ""}`}>
<Link href={`/search/${input}`} className="relative w-[15%] flex items-center">
            <button className="search-close flex items-center align-center">
        <IoArrowForward />
      </button>
      </Link>
      <input
        type="text"
        className="form-input"
        id="searchModal"
        placeholder="Search something..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => setSearchModal(false)} className="search-close relative w-max flex items-center justify-center align-center">
        <IoCloseCircleOutline />
      </button>
    </div>
  );
};

export default SearchModal;
