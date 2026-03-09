import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateCheckoutMutation, useGetSubscriptionStatusQuery } from "../../redux/featuresAPI/subscription/subscription.api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/featuresAPI/auth/auth.slice";
import { CheckCircle } from "lucide-react";

import mastercardIcon from "../../assets/payment/Mastercard.svg";
import visaIcon from "../../assets/payment/Payment method icon.svg";

const CheckoutForm = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("Card");
  const [loading, setLoading] = useState(false);
  const [createCheckout] = useCreateCheckoutMutation();
  const { data: statusData, isLoading: statusLoading } = useGetSubscriptionStatusQuery({});
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const isTenant = user?.role === "tenant";
  const hasSubscription = statusData?.has_subscription || statusData?.status === "active";

  useEffect(() => {
    if (!isTenant) {
      navigate("/");
    } else if (hasSubscription && !statusLoading) {
      toast.error("You already have an active subscription.", { id: 'sub-active' });
      navigate("/dashboard-tenant");
    }
  }, [isTenant, hasSubscription, statusLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTenant) {
      toast.error("Subscriptions are only available for tenants.");
      return;
    }
    if (hasSubscription) {
      toast.error("You are already subscribed to the Premium Plan.");
      return;
    }

    if (selectedMethod !== "Card") {
      toast.error(`${selectedMethod} is currently not supported. Please use Card.`);
      return;
    }

    setLoading(true);
    try {
      const result = await createCheckout({}).unwrap();
      const redirectUrl = result.url || result.checkout_url || result.data?.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("Failed to initialize payment redirection.");
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast.error(err?.data?.message || err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CardIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="p-10 max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100">
      <Toaster position="top-center" />

      <header className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Abonnement complet</h2>
        <p className="text-gray-500 italic">Vérifiez vos informations et procédez au paiement sécurisé.</p>
      </header>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Adresse email</label>
            <input
              type="email"
              placeholder="email@example.com"
              defaultValue={user?.email || ""}
              readOnly
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Nom et prénom</label>
            <input
              type="text"
              placeholder="First Last"
              defaultValue={`${user?.first_name || ""} ${user?.last_name || ""}`.trim()}
              readOnly
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700 ml-1">Payment Method</label>
          <div
            onClick={() => setSelectedMethod("Card")}
            className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${selectedMethod === "Card" ? "border-blue-600 bg-blue-50/30" : "border-gray-100 bg-white hover:border-gray-200"
              }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "Card" ? "border-blue-600" : "border-gray-300"}`}>
                {selectedMethod === "Card" && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
              </div>
              <div className="flex items-center gap-3">
                <CardIcon className="w-6 h-6 text-gray-700" />
                <span className="font-bold text-gray-900">Secure Card Payment</span>
              </div>
            </div>
            <div className="flex gap-1">
              <img src={visaIcon} alt="Visa" className="h-6" />
              <img src={mastercardIcon} alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              required
            />
            <p className="text-sm text-amber-800 leading-relaxed font-medium">
              I accept the general terms and conditions of sale and acknowledge that the subscription will begin immediately upon successful payment.
            </p>
          </label>
        </div>

        {hasSubscription ? (
          <div className="bg-green-50 rounded-2xl border border-green-200 p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-800 mb-1">Active Subscription</h3>
            <p className="text-sm text-green-700">
              You are already enjoying all the premium features of Sacha.
            </p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              disabled={loading || !isTenant || statusLoading}
              className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-200 transform transition-all active:scale-[0.98] ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1"
                } ${(!isTenant || statusLoading) ? "bg-gray-400 shadow-none cursor-not-allowed transform-none hover:-translate-y-0 active:scale-100 opacity-70" : ""}`}
            >
              {loading || statusLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {statusLoading ? "CHECKING STATUS..." : "PROCESSING..."}
                </div>
              ) : (
                "PAY AND START SUBSCRIPTION"
              )}
            </button>

            <p className="text-center text-xs text-gray-400 font-medium">
              Payments are securely processed by Stripe. You will be redirected to their hosted checkout page.
            </p>
          </>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
