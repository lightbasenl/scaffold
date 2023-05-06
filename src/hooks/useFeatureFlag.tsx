import type { FeatureFlagCurrentResponse } from "generated/common/types";
import { useFeatureFlagCurrent } from "generated/featureFlag/reactQueries";

/**
 * Alias for feature flag route.
 *
 * Provides fallback values for features to false.
 */
export default function useFeatureFlag(): FeatureFlagCurrentResponse {
  const { data } = useFeatureFlagCurrent({
    queryOptions: {
      // @ts-expect-error since the feature flag response is strictly typed, this is needed,
      // else we need to update this file after each feature flag addition or removal.
      placeholderData: {},
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return data!;
}
