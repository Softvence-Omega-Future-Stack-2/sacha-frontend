import { useGetSubscriptionStatusQuery } from "../redux/featuresAPI/subscription/subscription.api";

export const useSubscription = () => {
  const { data, isLoading, error } = useGetSubscriptionStatusQuery({});

  return {
    hasSubscription: data?.has_subscription || false,
    isLoading,
    error,
    message: data?.message,
  };
};
