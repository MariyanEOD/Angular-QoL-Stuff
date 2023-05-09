import { HttpResponse } from '@angular/common/http';

export function getPaginationHeader(response: any) {
  const headers = {
    totalPages: +response.headers.get('x-wp-totalpages'),
    pageSize: +response.headers.get('x-wp-total'),
  };

  if (
    headers.pageSize === null ||
    headers.pageSize === undefined ||
    headers.totalPages === null ||
    headers.totalPages === undefined
  ) {
    throw new Error(
      'Theres missing header/s ' + JSON.stringify(headers, null, 2)
    );
  }
  return {
    data: [...response.body],
    ...headers,
  };
}
