import AuthLayout from "@src/components/layouts/auth-layout";
import CreatePassword from "@src/components/templates/_reset-pasword";

function Page() {
  return (
    <AuthLayout>
      <CreatePassword />
    </AuthLayout>
  );
}

export default Page;
