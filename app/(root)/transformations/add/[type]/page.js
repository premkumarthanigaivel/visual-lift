import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({ params }) => {
  const { userId } = await auth();
  // console.log("userId", userId);

  // const userCu = await currentUser();

  // console.log("userCu", userCu);

  const { type } = await params;
  const transformation = transformationTypes[type];

  console.log("userId: ", userId);

  if (!userId) redirect("/");

  const user = await getUserById(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
