export type ApiListResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    pageCount: number;
    totalCount: number;
    limit: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    nextPage?: number;
    previousPage?: number;
  };
};
