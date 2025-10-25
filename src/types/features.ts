import { FeatureFlag } from '@/config/features';

/**
 * Component props for feature-flagged components
 */
export interface FeatureFlaggedProps {
  feature?: FeatureFlag;
  fallback?: React.ReactNode;
}

/**
 * Feature metadata
 */
export interface FeatureMetadata {
  name: FeatureFlag;
  enabled: boolean;
  description: string;
  slice: number;
  story: string;
}
