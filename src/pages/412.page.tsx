import { useEffect, useState } from "react";

import Head from "next/head";

import tenantsConfig from "../../config/tenants.json";

// This page is triggered by the middleware if no tenant can't be found.
export default function FourOneTwo() {
  const [hostname, setHostname] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }

    // For development purposes, it is possible to force a specific origin. This
    // will always overwrite the hostname.
    if (!!process.env.TENANT_ORIGIN) {
      setHostname(process.env.TENANT_ORIGIN);
    }
  }, []);

  const tenantHostnames = Object.values(tenantsConfig.tenants)
    .map(it => Object.keys(it.urlConfig))
    .flat();

  return (
    <>
      <Head>
        <title>412 - Precondition failed</title>
      </Head>
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-blox-blue-600 sm:text-5xl">412</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Precondition failed
                </h1>
                <p className="mt-1 text-base text-gray-500">{`Current hostname (${hostname}) doesn't match any valid tenant origin${
                  process.env.NODE_ENV === "development" ? ` (${tenantHostnames.join(", ")})` : ""
                }.`}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
