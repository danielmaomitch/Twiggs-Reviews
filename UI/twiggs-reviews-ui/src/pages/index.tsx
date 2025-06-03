import Catalog from "./catalog/index";
import { useSession } from "next-auth/react";
import Login from "./login";

const Home: React.FC = () => {
  const { data: session } = useSession();
  return <main>{session ? <Catalog /> : <Login />}</main>;
};

export default Home;
