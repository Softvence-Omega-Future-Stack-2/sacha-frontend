import { useGetSubscriptionStatusQuery } from "../redux/featuresAPI/subscription/subscription.api";

export const SubscriptionDebug = () => {
  const { data, isLoading, error } = useGetSubscriptionStatusQuery({});

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
      <h3 className="font-bold text-sm mb-2">Subscription Debug</h3>
      {isLoading && <p className="text-blue-600">Loading...</p>}
      {error && (
        <div className="text-red-600">
          <p>Error: {JSON.stringify(error)}</p>
        </div>
      )}
      {data && (
        <div className="text-green-600">
          <p>Status: {data.has_subscription ? "Active" : "Inactive"}</p>
          <p>Message: {data.message}</p>
        </div>
      )}
    </div>
  );
};