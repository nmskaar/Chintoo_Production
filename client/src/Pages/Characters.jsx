import React, { useEffect } from "react";
import CharactersCards from "../Components/CharactersCards";

const Characters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <CharactersCards />
    </div>
  );
};

export default Characters;
