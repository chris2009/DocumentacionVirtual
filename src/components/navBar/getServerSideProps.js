import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getServerSideProps() {
    const session = await getServerSession(authOptions);
  
    return {
      props: { session },
    };
  }