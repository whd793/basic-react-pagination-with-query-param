import "./styles.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import React from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const total = 100;

  const slicedata = products.slice(firstIndex, lastIndex);

  const fetchdata = async () => {
    const data = await axios.get(
      `https://dummyjson.com/products?limit=5&skip=${firstIndex}`
    );
    // const res = await data.data.json();
    // const json = await data.json();
    // const res = data.data;
    console.log(data.data);
    setProducts(data.data.products);
  };

  useEffect(() => {
    // if (!products || products.length === 0) {
    fetchdata();
    // }
  }, [currentPage]);

  return (
    <div className="App">
      <h1
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        {currentPage}
      </h1>
      <div>
        {products.map((n, i) => {
          return <div>{n.title}</div>;
        })}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        total={total}
      />
    </div>
  );
}

const Pagination = ({ itemsPerPage, total, setCurrentPage }) => {
  let paginated = [];

  for (let i = 0; i < Math.ceil(total / itemsPerPage); i++) {
    paginated.push(i + 1);
  }

  return (
    <div>
      {paginated.map((n, i) => {
        return (
          <span
            onClick={() => {
              setCurrentPage(n);
            }}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
};

// export default React.memo(App);
