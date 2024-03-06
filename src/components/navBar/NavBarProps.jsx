import Navbar from "./Navbar";
import { getServerSideProps } from "./getServerSideProps";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NavbarProps() {
    const props = await getServerSideProps(authOptions);
    return<> <Navbar {...props} /></>
    ;
}