import AuthLayout from "@src/components/layouts/auth-layout";
import ForgotPassword from "@src/components/templates/_forgot-password";
import React from "react";

function Page() {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
}

export default Page;
