import MainLayout from "@src/components/layouts/main-layout";
import ExerciseManagement from "@src/components/templates/_exercise";

function Page() {
  return <MainLayout main={<ExerciseManagement />} />;
}

export default Page;
