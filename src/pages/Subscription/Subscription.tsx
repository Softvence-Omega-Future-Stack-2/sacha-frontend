import { useGetSubscriptionStatusQuery, useCreateCheckoutMutation } from "../../redux/featuresAPI/subscription/subscription.api";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/featuresAPI/auth/auth.slice";
import { SubscriptionDebug } from "../../components/SubscriptionDebug";
import { Check } from "lucide-react";

export default function Subscription() {
  const user = useSelector(selectUser);
  const { data: statusData, isLoading: statusLoading } = useGetSubscriptionStatusQuery({});
  const [createCheckout, { isLoading: checkoutLoading }] = useCreateCheckoutMutation();

  const isTenant = user?.role === "tenant";

  const handleSubscribe = async () => {
    if (!isTenant) {
      toast.error("Only tenants can subscribe to this plan.");
      return;
    }

    try {
      const result = await createCheckout({}).unwrap();
      if (result?.url) {
        window.location.href = result.url;
      } else if (result?.checkout_url) {
        window.location.href = result.checkout_url;
      } else if (result?.data?.url) {
        window.location.href = result.data.url;
      } else {
        console.error('No redirect URL in response:', result);
        toast.error('Failed to initialize subscription. Invalid response from server.');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error?.data?.message || "Failed to start checkout process. Please try again.");
    }
  };

  if (statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 font-medium">Loading subscription status...</p>
        </div>
      </div>
    );
  }

  if (!isTenant && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-8">Subscriptions are currently only available for Tenant accounts. Please log in with a tenant account to continue.</p>
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const hasSubscription = statusData?.has_subscription || statusData?.status === "active";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 selection:bg-blue-100">
      <Toaster position="top-center" />
      <SubscriptionDebug />
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Premium Membership</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Unlock the full potential of Sacha with our premium features designed for serious tenants.</p>
        </header>

        {hasSubscription ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-10 text-center border border-blue-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Subscription Active</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">You are currently on the Premium Plan. All premium features are active on your account.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Account Status: Pro
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-8 items-stretch">
            <div className="md:col-span-3 bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                What's Included
              </h2>
              <div className="space-y-5">
                {[
                  "Unlimited property applications",
                  "Verified tenant badge on your profile",
                  "Early access to new property listings",
                  "Direct messaging with property owners",
                  "Priority support with 24h response time",
                  "Advanced search filters and alerts"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200/50 p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-tl-full -mb-10 -mr-10"></div>

              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Best Value</span>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">€29</span>
                    <span className="text-xl opacity-80 font-medium">.99</span>
                    <span className="text-lg opacity-60 ml-1">/mo</span>
                  </div>
                  <p className="mt-2 text-blue-100 font-medium">Billed monthly. Cancel anytime.</p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubscribe}
                  disabled={checkoutLoading}
                  className={`w-full py-5 rounded-2xl font-bold text-blue-600 bg-white shadow-lg hover:bg-blue-50 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 ${checkoutLoading ? "opacity-90 cursor-not-allowed translate-y-0 shadow-none" : ""
                    }`}
                >
                  {checkoutLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Upgrade to pro"
                  )}
                </button>
                <p className="text-center mt-6 text-xs text-blue-100 opacity-80">
                  Secure payment via Stripe. Tax included where applicable.
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Need help? Contact our <a href="/contact" className="text-blue-600 font-semibold hover:underline">support team</a>.
            By subscribing, you agree to our <a href="#" className="font-medium text-gray-700 hover:underline">Terms of Service</a>.
          </p>
        </footer>
      </div>
    </div>
  );
}
