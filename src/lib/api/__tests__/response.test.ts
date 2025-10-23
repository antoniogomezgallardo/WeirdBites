/**
 * @jest-environment node
 */
import { apiSuccess, apiError } from '../response';

describe('API Response Utilities', () => {
  describe('apiSuccess', () => {
    it('should return success response with default status 200', () => {
      const data = { message: 'Success' };
      const response = apiSuccess(data);

      expect(response.status).toBe(200);
    });

    it('should return success response with custom status', () => {
      const data = { message: 'Created' };
      const response = apiSuccess(data, 201);

      expect(response.status).toBe(201);
    });
  });

  describe('apiError', () => {
    it('should return error response with default status 500', () => {
      const response = apiError('Internal Server Error');

      expect(response.status).toBe(500);
    });

    it('should return error response with custom status', () => {
      const response = apiError('Not Found', 404);

      expect(response.status).toBe(404);
    });

    it('should include details when provided', () => {
      const details = { field: 'email', issue: 'invalid format' };
      const response = apiError('Validation Error', 400, details);

      expect(response.status).toBe(400);
    });
  });
});
