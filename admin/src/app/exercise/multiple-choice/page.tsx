import MainLayout from "@src/components/layouts/main-layout";
import MultipleChoiceExercise from "@src/components/templates/_exercise/multiple_choice";

function Page() {
  return <MainLayout main={<MultipleChoiceExercise />} />;
}

export default Page;
