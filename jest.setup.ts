import '@testing-library/jest-dom';

// Mock Next.js Request and Response for API route tests
// Next.js uses Web APIs that aren't available in Node.js test environment
class MockHeaders {
  private headers: Map<string, string> = new Map();

  append(name: string, value: string) {
    this.headers.set(name.toLowerCase(), value);
  }

  delete(name: string) {
    this.headers.delete(name.toLowerCase());
  }

  get(name: string) {
    return this.headers.get(name.toLowerCase()) || null;
  }

  has(name: string) {
    return this.headers.has(name.toLowerCase());
  }

  set(name: string, value: string) {
    this.headers.set(name.toLowerCase(), value);
  }

  forEach(callback: (value: string, key: string) => void) {
    this.headers.forEach((value, key) => callback(value, key));
  }

  entries() {
    return this.headers.entries();
  }

  keys() {
    return this.headers.keys();
  }

  values() {
    return this.headers.values();
  }
}

class MockRequest {
  private _url: string;
  private _method: string;
  headers: MockHeaders;
  body: unknown;

  constructor(input: string | { url: string; method?: string }) {
    if (typeof input === 'string') {
      this._url = input;
      this._method = 'GET';
    } else {
      this._url = input.url;
      this._method = input.method || 'GET';
    }
    this.headers = new MockHeaders();
    this.body = null;
  }

  get url() {
    return this._url;
  }

  get method() {
    return this._method;
  }
}

class MockResponse {
  status: number;
  statusText: string;
  headers: MockHeaders;
  body: unknown;

  constructor(body?: unknown, init?: { status?: number; statusText?: string }) {
    this.body = body;
    this.status = init?.status || 200;
    this.statusText = init?.statusText || 'OK';
    this.headers = new MockHeaders();
  }

  json() {
    return Promise.resolve(this.body);
  }

  // Static method for NextResponse.json()
  static json(data: unknown, init?: { status?: number; statusText?: string; headers?: unknown }) {
    const response = new MockResponse(data, init);
    if (init?.headers) {
      Object.entries(init.headers as Record<string, string>).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }
    return response;
  }
}

global.Request = MockRequest as never;
global.Response = MockResponse as never;
global.Headers = MockHeaders as never;

// Suppress React DOM warnings about Next.js Image boolean props in test environment
// These warnings occur because Next.js Image uses `fill={true}` and `priority={true}`
// which React DOM interprets as non-boolean attributes in jsdom
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const firstArg = typeof args[0] === 'string' ? args[0] : '';
    if (
      firstArg.includes('Received `true` for a non-boolean attribute') ||
      firstArg.includes('If you want to write it to the DOM')
    ) {
      return; // Suppress Next.js Image component warnings
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
