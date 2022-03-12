import { useEffect } from "react";

const Home = () => {
  console.log("HOME");
  useEffect(() => {
    console.log("Component Home");
  }, []);

  return (
    <div>
      <div>Home Hello</div>
    </div>
  );
};

export default Home;
