import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { HealthCheckResponse } from '@/types/api';

/**
 * Health check endpoint
 * Tests API availability and database connectivity
 * @returns JSON response with health status
 */
export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    await prisma.$disconnect();

    const response: HealthCheckResponse = {
      status: 'ok',
      message: 'API and database are operational',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(response);
  } catch {
    const response: HealthCheckResponse = {
      status: 'error',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(response, { status: 503 });
  }
}
