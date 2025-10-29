# Product Images

This directory contains product images for WeirdBites.

## Structure

```
images/
├── placeholder.svg          # Default placeholder for missing images
└── products/
    ├── durian-chips.jpg
    ├── black-garlic-chocolate.jpg
    ├── sriracha-popcorn.jpg
    └── ... (15 products total)
```

## Current Status

**Placeholder images**: All product images currently use the SVG placeholder (`placeholder.svg`). This is intentional for the MVP phase to avoid licensing and copyright issues with real product photos.

## Future Improvements

When adding real product images:

1. **Image Format**: Use WebP for better compression (fallback to JPG/PNG)
2. **Image Sizes**: Provide multiple sizes for responsive images
   - Thumbnail: 400x400px
   - Full size: 1200x1200px
3. **Image Optimization**: Run through image optimization pipeline
4. **Alt Text**: Ensure descriptive alt text in database (already implemented)
5. **Licensing**: Verify proper licensing/permissions for all product photos

## Adding New Images

To add a real product image:

1. Place the image in `public/images/products/`
2. Name it to match the `imageUrl` in the database (e.g., `durian-chips.jpg`)
3. Optimize the image before committing (use `next/image` optimization or manual tools)
4. Ensure image dimensions are at least 400x400px

## Testing

The application gracefully handles missing images by:

- Using Next.js Image component with proper error handling
- Showing placeholder when images fail to load
- Maintaining alt text for accessibility (WCAG 2.1 compliance)
