import type { FeatureFlagCurrentResponseApi } from "generated/common/types";
import { useFeatureFlagCurrent } from "generated/featureFlag/reactQueries";

/**
 * Alias for feature flag route.
 *
 * Provides fallback values for features to false.
 */
export default function useFeatureFlag(): FeatureFlagCurrentResponseApi {
  const { data } = useFeatureFlagCurrent({
    options: {
      // @ts-expect-error since the feature flag response is strictly typed, this is needed,
      // else we need to update this file after each feature flag addition or removal.
      placeholderData: {},
    },
  });

  return data!;
}
