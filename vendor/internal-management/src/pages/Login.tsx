import { Disclosure } from "@headlessui/react";
import { parseCookies, setCookie } from "nookies";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { tw } from "twind";
import { useAuthMe } from "../generated/auth/reactQueries";
import { useManagementRequestMagicLink } from "../generated/management/reactQueries";

export function Login() {
  const { data } = useAuthMe();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      slackUserId: "",
    },
  });

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies.slackUserId) {
      resetForm({
        slackUserId: cookies.slackUserId,
      });
    }
  }, [resetForm]);

  const { mutate } = useManagementRequestMagicLink({
    onSuccess: (data, variables) => {
      setCookie(null, "slackUserId", variables.slackUserId, {
        maxAge: 30 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        path: "/_lightbase",
      });

      resetForm();

      if (data.magicLink) {
        // magicLink is a full url (http://localhost:3000/_lightbase/...), so we just force the browser to go there instead of trying to match up and slice and dice a relative path out of it.
        window.location.href = data.magicLink;
      }
    },
  });

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className={tw`flex h-screen flex-col items-center justify-center`}>
      <div className={tw`w-full max-w-xl rounded-xl bg-white p-8 shadow-md`}>
        <form
          onSubmit={handleSubmit(values => {
            mutate(values);
          })}
          className={tw`space-y-8`}
        >
          <div className={tw`space-y-4`}>
            <h1 className={tw`text-xl font-bold tracking-wide text-gray-700`}>Login</h1>
            <div className={tw`space-y-4`}>
              <Disclosure>
                <div className={tw`flex items-center space-x-2`}>
                  <p className={tw`text-gray-500`}>Please enter your Slack User ID</p>
                  <Disclosure.Button
                    title="Where can I find my Slack User ID?"
                    className={tw`rounded-full p-1 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={tw`h-5 w-5 text-blue-500`}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                    <span className={tw`sr-only`}>Where can I find my Slack User ID?</span>
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel className={tw`space-y-2 space-y-4 rounded-xl bg-blue-50 p-4  `}>
                  <h2 className={tw`text-sm font-bold tracking-wide text-blue-900`}>
                    How to find your Slack User ID
                  </h2>

                  <ul className={tw`list-disc space-y-2 pl-4 text-xs text-blue-800`}>
                    <li>
                      Open your profile by pressing on your profile picture, shown top right in Slack, and
                      pressing &apos;Profile&apos;.
                    </li>
                    <li>
                      In your profile, press the ellipsis (three dots) next to &apos;Set a status&apos;.
                    </li>
                    <li>Press &apos;Copy member ID&apos;</li>
                  </ul>
                </Disclosure.Panel>
              </Disclosure>
            </div>
          </div>
          <div className={tw`space-y-4`}>
            <div className={tw`group space-y-1`}>
              <label
                htmlFor="slackUserId"
                className={tw`text-xs text-gray-600 group-focus-within:text-blue-700`}
              >
                Slack User ID
              </label>
              <input
                id="slackUserId"
                className={tw`block w-full rounded-lg px-3 py-3 text-gray-600 shadow-inner ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("slackUserId", {
                  required: true,
                  maxLength: 32,
                  minLength: 7,
                })}
              />
            </div>
            <button
              type="submit"
              className={tw`block w-full rounded-lg bg-blue-600 px-2 py-3 font-medium text-white focus:outline-none focus:ring`}
            >
              Request login link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
