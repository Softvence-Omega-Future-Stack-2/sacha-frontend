import { useSubscription } from "../hooks/useSubscription";

export const SubscriptionBadge = () => {
  const { hasSubscription, isLoading } = useSubscription();

  if (isLoading) return <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>;

  return hasSubscription ? (
    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
      Premium
    </span>
  ) : (
    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
      Free
    </span>
  );
};