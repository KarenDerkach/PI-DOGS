import React from "react";
import styles from "./styless/Pagination.module.css";
//componente que renderiza el paginado
function Pagination({ paginate, dogsPerPage, allDogs, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    //redondea al numero entero mas cercano,p/ arriba
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className={styles.container}>
          {pageNumbers?.map((number) => (
            <li key={number} className={styles.number}>
              <div
                className={
                  currentPage === number ? styles.crumb_active : styles.crumb
                }
                onClick={() => paginate(number)}
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
