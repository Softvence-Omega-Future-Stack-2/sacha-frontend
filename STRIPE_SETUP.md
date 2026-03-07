# Stripe Payment Integration Setup

## 1. Install Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## 2. Environment Setup
Create `.env` file in root directory:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## 3. Add Route to App
In your router configuration, add:
```tsx
import Subscription from "./pages/Subscription/Subscription";

// Add this route
{
  path: "/subscription",
  element: <Subscription />
}
```

## 4. Protect Routes (Optional)
Wrap routes that require subscription:
```tsx
import { ProtectedRoute } from "./components/ProtectedRoute";

{
  path: "/premium-feature",
  element: (
    <ProtectedRoute requireSubscription>
      <PremiumFeature />
    </ProtectedRoute>
  )
}
```

## 5. Usage Examples

### Check subscription status anywhere:
```tsx
import { useSubscription } from "../hooks/useSubscription";

function MyComponent() {
  const { hasSubscription, isLoading } = useSubscription();
  
  if (hasSubscription) {
    return <PremiumContent />;
  }
  return <UpgradePrompt />;
}
```

### Show subscription badge:
```tsx
const { hasSubscription } = useSubscription();

{hasSubscription && (
  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
    Premium
  </span>
)}
```

## 6. API Response Structure

### GET /subscription/status/
```json
{
  "has_subscription": false,
  "message": "No active subscription found"
}
```

### POST /subscription/create-payment-intent/
```json
{
  "clientSecret": "pi_xxx_secret_xxx"
}
```

## 7. Testing
Use Stripe test cards:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Any future date for expiry
- Any 3 digits for CVC

## Files Created:
- `/src/redux/featuresAPI/subscription/subscription.api.ts` - API endpoints
- `/src/pages/Subscription/Subscription.tsx` - Payment page
- `/src/hooks/useSubscription.ts` - Subscription hook
- `/src/components/ProtectedRoute.tsx` - Route protection
- `.env.example` - Environment template
