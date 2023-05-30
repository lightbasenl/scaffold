import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authCreateCookiesFromTokenPair } from "../auth/cookies";
import { useAuthMe } from "../generated/auth/reactQueries";
import { useAuthAnonymousBasedLogin } from "../generated/authAnonymousBased/reactQueries";

export function TokenAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useParams();

  const { mutate } = useAuthAnonymousBasedLogin({
    onSuccess: async response => {
      authCreateCookiesFromTokenPair(response);
      await useAuthMe.invalidate(queryClient);
      navigate("/");
    },
  });

  useEffect(() => {
    if (!!token) {
      mutate({
        token,
      });
    } else {
      navigate("login");
    }
  }, [mutate, navigate, queryClient, token]);

  return <div>Loading...</div>;
}
