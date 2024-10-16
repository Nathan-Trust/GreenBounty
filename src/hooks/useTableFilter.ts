import { useState, useMemo } from "react";

// Type for the hook's parameters
interface UseTableFilterParams<T> {
  data?: T[]; // Data array to filter
  initialRowsPerPage?: number; // Initial number of rows per page
  searchField?: keyof T; // Field to use for filtering (must be a valid key of T)
}

/**
 * Custom hook to manage table filtering and pagination.
 * @param {Array} data - The original data array to filter.
 * @param {number} initialRowsPerPage - Initial number of rows per page.
 * @param {string} searchField - The field to use for search filtering (e.g., "name", "title").
 * @returns {Object} An object containing filtered data, search term, pagination states, active view, and handlers.
 */

export const useTableFilter = <T>({
  data = [],
  initialRowsPerPage = 10,
  searchField, // Field to filter on (e.g., "name" or "title")
}: UseTableFilterParams<T>) => {
  // State for managing search term, pagination, and active view
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [activeView, setActiveView] = useState<"menu" | "grid">("menu"); // Active view state

  // Memoized filtered data to optimize performance
  const filteredData = useMemo(() => {
    if (!data || searchTerm.trim() === "" || !searchField) return data;

    return data.filter((item) => {
      // Ensure that `searchField` is a valid key of `item`
      const fieldValue = item[searchField];
      return (
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchField, searchTerm]);

  // Get the paginated data for the current page
  const paginatedData = useMemo(() => {
    return filteredData.slice(0, rowsPerPage);
  }, [filteredData, rowsPerPage]);

  return {
    filteredData,
    paginatedData,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    activeView, // Expose active view
    setActiveView, // Expose setter for active view
  };
};
