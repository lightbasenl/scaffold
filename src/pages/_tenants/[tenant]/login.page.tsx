import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuthPasswordBasedLogin } from "generated/authPasswordBased/reactQueries";
import type { AuthPasswordBasedLoginBody, AuthTokenPair } from "generated/common/types";

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
  } = useForm<AuthPasswordBasedLoginBody>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AuthPasswordBasedLoginBody) => authPasswordBasedLogin(data);

  const { mutate: authPasswordBasedLogin, error } = useAuthPasswordBasedLogin({
    onSuccess(data: AuthTokenPair) {
      authCreateCookiesFromTokenPair(data);
      router.push("/private");
    },
  });

  return (
    <>
      <div className="isolate bg-white">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="px-6 pt-6 lg:px-8">
          <div>
            <nav className="flex h-9 items-center justify-between" aria-label="Global">
              <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                <a href="/" className="-m-1.5 p-1.5">
                  <SvgLogo className="mx-auto h-12 w-auto" aria-label="Lightbase" />
                </a>
              </div>

              <div className="flex lg:min-w-0 lg:flex-1 lg:justify-end">
                <a
                  href="/login"
                  className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  {t("home.login")}
                </a>
              </div>
            </nav>
          </div>
        </div>

        <main id="main">
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-3xl pb-32 pt-20 sm:pb-40 sm:pt-48">
              <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-center">{t("login.cta")}</h1>

              <div className="bg-white p-8 shadow sm:rounded-lg">
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
                      className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {t("login.signIn")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
