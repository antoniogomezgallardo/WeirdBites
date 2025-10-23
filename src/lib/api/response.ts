import { NextResponse } from 'next/server';

/**
 * Creates a successful API response
 * @param data - The data to return
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with the data
 */
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Creates an error API response
 * @param message - Error message
 * @param status - HTTP status code (default: 500)
 * @param details - Optional additional error details
 * @returns NextResponse with error information
 */
export function apiError(message: string, status = 500, details?: unknown) {
  const response: Record<string, unknown> = {
    error: message,
  };

  if (details) {
    response.details = details;
  }

  return NextResponse.json(response, { status });
}
