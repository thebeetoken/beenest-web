import qs from 'qs';

export function stringifyQueryString(queryStringObject: object): string {
  return qs.stringify(queryStringObject);
}

export function parseQueryString(queryString: string): object {
  return qs.parse(queryString, { ignoreQueryPrefix: true });
}

// Does not work in Server
export function addQueryParams(queryParams: object, queryString: string): string {
  const paramsObject = qs.parse(queryString, { ignoreQueryPrefix: true });
  return qs.stringify({ ...paramsObject, ...queryParams });
}
