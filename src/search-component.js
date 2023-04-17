import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function SearchComponent() {
  const [queryParams, setQueryParams] = useState({
    active: false,
    promotion: false,
    name: "",
    page: 1
  });

  const handleActiveChange = (e) => {
    setQueryParams((prevState) => ({
      ...prevState,
      active: e.target.checked,
      page: 1 // reset page number on search parameter change
    }));
  };

  const handlePromotionChange = (e) => {
    setQueryParams((prevState) => ({
      ...prevState,
      promotion: e.target.checked,
      page: 1 // reset page number on search parameter change
    }));
  };

  const handleNameChange = (e) => {
    setQueryParams((prevState) => ({
      ...prevState,
      name: e.target.value,
      page: 1 // reset page number on search parameter change
    }));
  };

  const handlePageChange = (page) => {
    setQueryParams((prevState) => ({
      ...prevState,
      page
    }));
  };

  const { data, isLoading, isError } = useQuery(
    ["products", queryParams],
    () => {
      const url = "https://642ec14a8ca0fe3352d7fe14.mockapi.io/products";
      return axios
        .get(url, { params: queryParams })
        .then((response) => response.data);
    }
  );

  const pageCount = Math.ceil((data?.length ?? 0) / 10);
  const pageNumbers = [...Array(pageCount)].map((_, i) => i + 1);

  return (
    <div>
      <h1>Search Component</h1>
      <form>
        <div>
          <label>
            <input
              type="checkbox"
              name="active"
              checked={queryParams.active}
              onChange={handleActiveChange}
            />
            Active
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="promotion"
              checked={queryParams.promotion}
              onChange={handlePromotionChange}
            />
            Promotion
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={queryParams.name}
              onChange={handleNameChange}
            />
          </label>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      <ul>
        {data &&
          data
            .slice((queryParams.page - 1) * 10, queryParams.page * 10)
            .map((item) => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Active: {item.active.toString()}</p>
                <p>Promotion: {item.promotion.toString()}</p>
              </li>
            ))}
      </ul>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePageChange(pageNumber)}
              disabled={queryParams.page === pageNumber}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
