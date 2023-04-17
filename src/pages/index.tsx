import { type NextPage } from "next";
import { useEffect } from "react";
import { api, setToken } from "~/utils/api";
import Explore from "./explore";

const Home: NextPage = () => {
  const { mutate: loginUser } = api.users.login.useMutation({
    onSuccess({ accessToken }) {
      setToken(accessToken);
    },
  });
  useEffect(() => {
    loginUser({
      username: "ADMIN",
      password: "ADMIN1041",
    });
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Explore />
      </main>
    </>
  );
};

export default Home;
