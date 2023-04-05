import { type NextPage } from "next";
import { useEffect } from "react";
import { api, setToken } from "~/utils/api";
import Explore from "./Explore";

const Home: NextPage = () => {
  const { mutate: loginUser } = api.users.login.useMutation({
    onSuccess({ accessToken }) {
      setToken(accessToken);
    },
  });
  const { mutate: createMany } = api.regions.createMany.useMutation();

  useEffect(() => {
    loginUser({
      username: "ADMIN",
      password: "ADMIN1041",
    });
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <button
          className="absolute left-4 top-40 "
          onClick={() => createMany()}
        >
          Create
        </button>
        <Explore />
      </main>
    </>
  );
};

export default Home;
