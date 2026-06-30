const BASE_URL = 'http://localhost:5135/api/';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseData = any;

type Params = Record<string, string | number | boolean | undefined | null>;

interface RequestConfig {
  params?: Params;
  responseType?: 'json' | 'blob';
  headers?: Record<string, string>;
}

interface ApiResponse {
  data: ResponseData;
  status: number;
}

class HttpError extends Error {
  response: { status: number; data: ResponseData };

  constructor(status: number, data: ResponseData) {
    super(`Request failed with status ${status}`);
    this.name = 'HttpError';
    this.response = { status, data };
  }
}

const buildUrl = (url: string, params?: Params): string => {
  const fullUrl = BASE_URL + url;
  if (!params) {
    return fullUrl;
  }

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });

  const query = search.toString();
  if (!query) {
    return fullUrl;
  }

  return `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${query}`;
};

const buildBody = (
  data: unknown,
  headers: Record<string, string>
): BodyInit | undefined => {
  if (data === undefined || data === null) {
    return undefined;
  }

  if (data instanceof FormData) {
    return data;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  return JSON.stringify(data);
};

const parseBody = async (
  response: Response,
  responseType?: 'json' | 'blob'
): Promise<ResponseData> => {
  if (responseType === 'blob') {
    return response.blob();
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const request = async (
  method: string,
  url: string,
  data?: unknown,
  config: RequestConfig = {}
): Promise<ApiResponse> => {
  const headers: Record<string, string> = { ...config.headers };
  const body = buildBody(data, headers);

  const response = await fetch(buildUrl(url, config.params), {
    method,
    credentials: 'include',
    headers,
    body,
  });

  const parsed = await parseBody(response, config.responseType);

  if (!response.ok) {
    throw new HttpError(response.status, parsed);
  }

  return { data: parsed, status: response.status };
};

const api = {
  get: (url: string, config?: RequestConfig) => request('GET', url, undefined, config),
  post: (url: string, data?: unknown, config?: RequestConfig) => request('POST', url, data, config),
  put: (url: string, data?: unknown, config?: RequestConfig) => request('PUT', url, data, config),
  patch: (url: string, data?: unknown, config?: RequestConfig) => request('PATCH', url, data, config),
  delete: (url: string, config?: RequestConfig) => request('DELETE', url, undefined, config),
};

export default api;
