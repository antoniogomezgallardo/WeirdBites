import '@testing-library/jest-dom';

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
