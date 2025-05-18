import MainLayout from "@src/components/layouts/main-layout";
import WriteExercise from "@src/components/templates/_exercise/write";

function Page() {
  return <MainLayout main={<WriteExercise />} />;
}

export default Page;
