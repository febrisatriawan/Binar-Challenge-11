import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Authenticated(props) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!auth.authenticatedUser) router.push("/login");
  }, [auth.authenticatedUser]);

  return <>{props.children}</>;
}

export default Authenticated;
