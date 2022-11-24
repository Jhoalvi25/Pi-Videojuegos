import React from "react";
import style from "../style/Paginated.module.css"

export default function Paginated({
  videogamesPerPage,
  allVideogames,
  paginated,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={style.page}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button onClick={() => paginated(number)}>{number}</button>
          ))}
      </ul>
    </nav>
  );
}
