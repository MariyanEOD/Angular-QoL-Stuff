import { HttpResponse } from '@angular/common/http';
interface ResponseData<T> {
  data: T[];
  totalPages: number;
  pageSize: number;
}

interface PaginationHeader {
  totalPages: number;
  pageSize: number;
}

export function getPaginationHeader<T>(response: any): ResponseData<T> {
  const headers: PaginationHeader = {
    totalPages: +response.headers.get('total-pages'),
    pageSize: +response.headers.get('page-size'),
  };

  if (headers.pageSize === null || headers.totalPages === null) {
    throw new Error(
      'Theres missing header/s ' + JSON.stringify(headers, null, 2),
    );
  }

  return {
    data: [...response.body] as T[],
    ...headers,
  };
}
