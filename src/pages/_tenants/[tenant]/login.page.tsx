import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuthPasswordBasedLogin } from "generated/authPasswordBased/reactQueries";
import type { AuthPasswordBasedLoginBodyInput, AuthTokenPairApi } from "generated/common/types";

import { defaultServerSideProps } from "lib/serverSideHelpers";

import FormErrorHandler from "components/FormErrorHandler";
import Input from "components/Input";

import { SvgLogo } from "assets/svg";
import { authCreateCookiesFromTokenPair } from "auth/cookies";

export const getServerSideProps = defaultServerSideProps({
  authDescription: {
    enforceSessionType: "guest",
  },
  namespaces: ["public"],
});

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthPasswordBasedLoginBodyInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AuthPasswordBasedLoginBodyInput) => authPasswordBasedLogin({ body: data });

  const { mutate: authPasswordBasedLogin, error } = useAuthPasswordBasedLogin({
    onSuccess(data: AuthTokenPairApi) {
      authCreateCookiesFromTokenPair(data);
      router.push("/private");
    },
  });

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <SvgLogo className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t("login.cta")}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormErrorHandler error={error} setError={setError} />
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("login.email")}
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    error={errors?.email?.message}
                    {...register("email")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("login.password")}
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    error={errors?.password?.message}
                    {...register("password")}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t("login.signIn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
