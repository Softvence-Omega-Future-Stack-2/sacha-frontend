import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import logo from "../../assets/main-logo.png";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">

                <div className="flex justify-center mb-8">
                    <img src={logo} alt="Sacha Logo" className="h-10 w-auto" />
                </div>

                <div className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Payment Successful!</h1>

                <p className="text-gray-600 mb-10 text-lg">
                    Thank you for subscribing to Sacha Premium. Your account has been upgraded, and all premium features are now unlocked.
                </p>

                <button
                    onClick={() => navigate("/dashboard-tenant")}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 py-4 rounded-xl uppercase font-bold text-sm tracking-wider transition-all transform hover:-translate-y-1 active:scale-95"
                >
                    Go to Dashboard
                </button>

            </div>
        </div>
    );
};

export default PaymentSuccess;
