import MainLayout from "@src/components/layouts/main-layout";
import DictationExercise from "@src/components/templates/_exercise/dictation";

function Page() {
  return <MainLayout main={<DictationExercise />} />;
}

export default Page;
