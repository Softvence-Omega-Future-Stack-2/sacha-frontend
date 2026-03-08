import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Apartments from "../pages/Apartments/Apartments";
import { Rental } from "../pages/Rental/Rental";
import Createaccount from "../pages/CreateAccount/Createaccount";
import Login from "../pages/Login/Login";
import ForgatePAssword from "../pages/ForgatePassword/ForgatePAssword";
import Otp from "../pages/Otp/Otp";
import CreateNewPassword from "../pages/CreateNewPassword/CreateNewPassword";
import ResetSuccessfull from "../pages/ResetSuccessfull/ResetSuccessfull";
import Details from "../pages/ProductDetails/Details";
import Premium from "../pages/Premium/Premium";
import HomeSearchResult from "../pages/HomeSearchResult/Result";
import FAQ from "../pages/FAQ/FAQ";
import Contact from "../pages/Contact/Contact";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Payment/PaymentCancel";
import Subscription from "../pages/Subscription/Subscription";
import Chat from "../pages/Chat/Chat";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

// Admin Dashboard Components
// import ApplicationsList from "../features/admin/components/Applications/ApplicationsList";
import OverviewDashboard from "../features/admin/components/OverviewDashboard/OverviewDashboar";

import TenantDirectory from "../features/admin/components/TenantDirectory/TenantDirectory";
import Myadd from "../features/admin/components/Myadd/Myadd";
import MessagesInbox from "../features/admin/components/Messages/MessagesInbox";

// Owner Dashboard Components
import MyFiles from "../features/owner/components/MyFilesPage/MyFiles";
import BeautifulModelsPage from "../features/owner/components/BeautifulModels/BeautifulModelsPage";
import PossessionsManager from "../features/owner/components/PossessionsManager/PossessionsManager";
import FavoritesPages from "../features/owner/components/Favorites/Favorites";
import SearchHistory from "../features/admin/components/SearchHistory/SearchHistory";
import MessagesInboxOwner from "../features/owner/components/Messages/MessagesInbox";
import MyprofileOwner from "../features/owner/components/MyProfile/Myprofile";
import AllDocuments from "../features/owner/components/AllDocuments/Alldocuments";

import OwnerDashboardLayout from "../features/owner/pages/OwnerDashboardLayout";
import TenantDashboard from "../features/admin/pages/TenantDashboard";
import TenantProfile from "../features/admin/components/MyProfile/Myprofile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/apartments",
        element: <Apartments />,
      },
      {
        path: "/rental",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <Rental />
          </ProtectedRoute>
        ),
      },
      {
        path: "/apartments/product-details/:id",
        element: <Details />,
      },
      {
        path: "/product-details",
        element: <Details />,
      },
      {
        path: "/premium",
        element: <Premium />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/search-result",
        element: <HomeSearchResult />,
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoute allowedRoles={["owner", "tenant"]}>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/create-account",
    element: <Createaccount />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgate-password",
    element: <ForgatePAssword />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/create-new-password",
    element: <CreateNewPassword />,
  },
  {
    path: "/reset-successfull",
    element: <ResetSuccessfull />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/cancel",
    element: <PaymentCancel />,
  },
  // owner dashboard 
  {
    path: "/dashboard-owner",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <OverviewDashboard />,
      },
      {
        path: "my-ads",
        element: <Myadd />,
      },
      {
        path: "beautiful-models",
        element: <BeautifulModelsPage />,
      },
      {
        path: "tenants-directory",
        element: <TenantDirectory />,
      },
      {
        path: "messages",
        element: <MessagesInbox />,
      },
      {
        path: "profile",
        element: <MyprofileOwner />,
      },
    ],
  },

  // tenant dashboard 
  {
    path: "/dashboard-tenant",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MyFiles />,
      },
      {
        path: "possessions",
        element: <PossessionsManager />,
      },
      // {
      //   path: "applications",
      //   element: <ApplicationsList />,
      // },
      {
        path: "search",
        element: <SearchHistory />,
      },
      {
        path: "favorites",
        element: <FavoritesPages />,
      },
      {
        path: "messages",
        element: <MessagesInboxOwner />,
      },
      {
        path: "documents",
        element: <AllDocuments />,
      },
      {
        path: "profile",
        element: <TenantProfile />,
      },
    ],
  },
]);

export default router;
