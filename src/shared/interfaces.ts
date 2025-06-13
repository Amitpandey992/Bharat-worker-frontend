export interface IPaginatedResponse<T> {
  dataList: T[];
  dataCount: number;
}

export interface IPaginationData {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
