import AuthLayout from "@src/components/layouts/auth-layout";
import Auth from "@src/components/templates/_auth";
import { GoogleOAuthProvider } from '@react-oauth/google'

function Page() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthLayout>
        <Auth />
      </AuthLayout>
    </GoogleOAuthProvider>
  );
}

export default Page;
