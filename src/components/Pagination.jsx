const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  return (
    <nav className="flex items-center justify-center mt-4">
      <ul className="inline-flex rounded-md shadow">
        <li
          className={`px-3 py-2 rounded-l-md ${
            isFirstPage
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white"
          } ${
            isFirstPage ? "pointer-events-none" : "cursor-pointer"
          } hover:bg-gray-300`}
          onClick={() => !isFirstPage && paginate(currentPage - 1)}
        >
          <span className="sr-only">Önceki</span>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.293 14.293a1 1 0 0 0 0-1.414L5.586 10l3.707-3.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414 0z"
            />
          </svg>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-3 py-2 ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-gray-300 cursor-pointer`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`px-3 py-2 rounded-r-md ${
            isLastPage
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white"
          } ${
            isLastPage ? "pointer-events-none" : "cursor-pointer"
          } hover:bg-gray-300`}
          onClick={() => !isLastPage && paginate(currentPage + 1)}
        >
          <span className="sr-only">Sonraki</span>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.707 5.293a1 1 0 0 0-1.414 1.414L13.586 10l-3.293 3.293a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 0z"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
