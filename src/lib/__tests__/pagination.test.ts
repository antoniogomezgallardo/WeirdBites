import {
  calculatePaginationOffset,
  calculatePaginationMeta,
  validatePaginationParams,
} from '../pagination';

describe('Pagination Utilities', () => {
  describe('calculatePaginationOffset', () => {
    describe('Happy Path', () => {
      it('should calculate correct offset for page 1', () => {
        const result = calculatePaginationOffset(1, 12);
        expect(result).toEqual({ skip: 0, take: 12 });
      });

      it('should calculate correct offset for page 2', () => {
        const result = calculatePaginationOffset(2, 12);
        expect(result).toEqual({ skip: 12, take: 12 });
      });

      it('should calculate correct offset for page 3', () => {
        const result = calculatePaginationOffset(3, 12);
        expect(result).toEqual({ skip: 24, take: 12 });
      });

      it('should handle different page sizes', () => {
        const result = calculatePaginationOffset(2, 20);
        expect(result).toEqual({ skip: 20, take: 20 });
      });

      it('should handle page size of 1', () => {
        const result = calculatePaginationOffset(5, 1);
        expect(result).toEqual({ skip: 4, take: 1 });
      });

      it('should handle large page numbers', () => {
        const result = calculatePaginationOffset(100, 12);
        expect(result).toEqual({ skip: 1188, take: 12 });
      });
    });
  });

  describe('calculatePaginationMeta', () => {
    describe('Happy Path', () => {
      it('should calculate metadata for 50 items with 12 per page', () => {
        const result = calculatePaginationMeta(1, 12, 50);
        expect(result).toEqual({
          currentPage: 1,
          pageSize: 12,
          totalItems: 50,
          totalPages: 5, // Math.ceil(50/12) = 5
        });
      });

      it('should calculate metadata for exact page boundary', () => {
        const result = calculatePaginationMeta(1, 12, 24);
        expect(result).toEqual({
          currentPage: 1,
          pageSize: 12,
          totalItems: 24,
          totalPages: 2, // Exactly 2 pages
        });
      });

      it('should calculate metadata for page 2', () => {
        const result = calculatePaginationMeta(2, 12, 50);
        expect(result).toEqual({
          currentPage: 2,
          pageSize: 12,
          totalItems: 50,
          totalPages: 5,
        });
      });

      it('should handle single item', () => {
        const result = calculatePaginationMeta(1, 12, 1);
        expect(result).toEqual({
          currentPage: 1,
          pageSize: 12,
          totalItems: 1,
          totalPages: 1,
        });
      });

      it('should handle zero items', () => {
        const result = calculatePaginationMeta(1, 12, 0);
        expect(result).toEqual({
          currentPage: 1,
          pageSize: 12,
          totalItems: 0,
          totalPages: 0, // Math.ceil(0/12) = 0
        });
      });

      it('should handle large datasets', () => {
        const result = calculatePaginationMeta(1, 20, 1000);
        expect(result).toEqual({
          currentPage: 1,
          pageSize: 20,
          totalItems: 1000,
          totalPages: 50, // 1000/20 = 50
        });
      });
    });
  });

  describe('validatePaginationParams', () => {
    describe('Happy Path', () => {
      it('should return null for valid parameters', () => {
        expect(validatePaginationParams(1, 12)).toBeNull();
      });

      it('should return null for page size at lower boundary', () => {
        expect(validatePaginationParams(1, 1)).toBeNull();
      });

      it('should return null for page size at upper boundary', () => {
        expect(validatePaginationParams(1, 100)).toBeNull();
      });

      it('should return null for large page numbers', () => {
        expect(validatePaginationParams(1000, 12)).toBeNull();
      });
    });

    describe('Error Scenarios', () => {
      describe('Page validation', () => {
        it('should reject page less than 1', () => {
          const result = validatePaginationParams(0, 12);
          expect(result).toContain('Page must be');
          expect(result).toContain('greater than 0');
        });

        it('should reject negative page', () => {
          const result = validatePaginationParams(-1, 12);
          expect(result).toContain('Page must be');
        });

        it('should reject NaN page', () => {
          const result = validatePaginationParams(NaN, 12);
          expect(result).toContain('Page must be');
        });
      });

      describe('Page size validation', () => {
        it('should reject page size less than 1', () => {
          const result = validatePaginationParams(1, 0);
          expect(result).toContain('Page size must be');
          expect(result).toContain('between 1 and 100');
        });

        it('should reject negative page size', () => {
          const result = validatePaginationParams(1, -1);
          expect(result).toContain('Page size must be');
        });

        it('should reject page size greater than 100', () => {
          const result = validatePaginationParams(1, 101);
          expect(result).toContain('Page size must be');
          expect(result).toContain('between 1 and 100');
        });

        it('should reject page size of 200', () => {
          const result = validatePaginationParams(1, 200);
          expect(result).toContain('between 1 and 100');
        });

        it('should reject NaN page size', () => {
          const result = validatePaginationParams(1, NaN);
          expect(result).toContain('Page size must be');
        });
      });
    });
  });
});
