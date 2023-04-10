"use client";
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSearchParams, useRouter } from 'next/navigation';

interface RansackSearchParams {
  serverRedirect: boolean;
}

interface Params {
  [key: string]: any;
}

const useSearch = (serverRedirect: boolean): [Params, (params: Params) => void] => {
  const [searchParams, setSearchParams] = useState<Params>({});
  const s = useSearchParams();
  const r = useRouter();

  useEffect(() => {
    setSearchParams(queryString.parse(s.toString()));
  }, [s]);

  const setRansackSearchParams = (params: Params) => {
    const newSearchParams: Params = { ...searchParams, ...params };
    const queryStringParams = queryString.stringify(newSearchParams);
    setSearchParams(newSearchParams);

    if (serverRedirect) {
      r.push(window.location.pathname + '?' + queryStringParams);
    } else {
      window.history.pushState(
        {},
        '',
        window.location.pathname + '?' + queryStringParams
      );
    }

  };

  return [searchParams, setRansackSearchParams];
};

export { useSearch };
