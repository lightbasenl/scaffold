import React, { useState } from "react";
import { tw } from "twind";
import useAuthenticate from "../auth/useAuthenticate";
import Button from "../components/Button";
import EditDescriptionFFModal from "../components/EditDescriptionFFModal";
import EditTenantSettingsFFModal from "../components/EditTentantSettingsFFModal";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import type { ManagementFeatureFlagItem } from "../generated/common/types";
import {
  useManagementFeatureFlagList,
  useManagementFeatureFlagUpdate,
} from "../generated/managementFeatureFlag/reactQueries";

export function FeatureFlags({ tenants }: { tenants?: string[] }) {
  useAuthenticate({
    enforceLoginType: "anonymousBased",
    enforceSessionType: "user",
    requireSinglePermission: ["lightbase:internal"],
  });

  const { data: { list: featureFlags } = {} } = useManagementFeatureFlagList({
    orderBy: ["name"],
  });

  return (
    <div className={tw`flex h-screen flex-col overflow-hidden`}>
      <div className={tw`flex h-full min-w-0 flex-1`}>
        <div className={tw`z-10 hidden lg:block`}>
          <SideBar />
        </div>
        <div className={tw`h-full min-w-0 flex-1`}>
          <TopBar />
          <div className={tw`h-full`}>
            <div className={tw`relative h-full w-full overflow-y-auto bg-[#fafafa]`}>
              <div className={tw`px-4 py-6 sm:px-6 lg:px-8`}>
                <h1 className={tw`text-lg font-medium text-[#2f2e35]`}>Feature flags</h1>
              </div>
              <div className={tw`px-4`}>
                <div className={tw`flex flex-col`}>
                  <div className={tw`-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}>
                    <div className={tw`inline-block min-w-full py-2 align-middle md:px-6 lg:px-8`}>
                      <div
                        className={tw`overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg`}
                      >
                        <table className={tw`min-w-full divide-y divide-gray-300`}>
                          <thead className={tw`bg-[#f8f8f8]`}>
                            <tr>
                              <th
                                scope="col"
                                className={tw`py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6 lg:pl-8`}
                              >
                                Identifier
                              </th>
                              <th scope="col" className={tw`px-3 py-3.5 text-left text-sm text-gray-900`}>
                                Description
                              </th>
                              <th scope="col" className={tw`px-3 py-3.5 text-left text-sm text-gray-900`}>
                                Last updated
                              </th>
                              <th scope="col" className={tw`relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8`}>
                                <span className={tw`sr-only`}>Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className={tw`divide-y divide-[#f8f8f8] bg-white`}>
                            {(featureFlags ?? []).map(it => (
                              <FeatureFlag flag={it} tenants={tenants} key={it.id} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureFlag({ flag, tenants }: { flag: ManagementFeatureFlagItem; tenants?: string[] }) {
  const { mutate } = useManagementFeatureFlagUpdate({}, { invalidateQueries: true });

  const [modeDescription, setModeDescription] = useState<"default" | "edit">("default");
  const [modeTenantSettings, setModeTenantSettings] = useState<"default" | "edit">("default");

  return (
    <>
      <tr data-testid="FeatureFlag.row">
        <td className={tw`whitespace-nowrap text-sm font-medium text-gray-900`}>
          <span
            className={tw("block h-full border-l-4 py-4 pl-4 pr-3 sm:pl-6 lg:pl-8", {
              "border-green-500": flag.globalValue,
              "border-transparent": !flag.globalValue,
            })}
          >
            {flag.name}
          </span>
        </td>
        <td className={tw`whitespace-nowrap px-3 py-4 text-sm text-gray-500`}>
          <span className={tw`flex items-center space-x-2`}>
            <span>{flag.description ? flag.description : "No description provided"}</span>
            <button
              data-testid="FeatureFlag.editDescription"
              onClick={() => setModeDescription("edit")}
              className={tw`rounded-full p-1 ring-blue-300 focus:outline-none focus:ring-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={tw`h-4 w-4`}
                aria-hidden="true"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              <span className={tw`sr-only`}>Edit description</span>
            </button>
          </span>
        </td>
        <td className={tw`whitespace-nowrap px-3 py-4 text-sm text-gray-500`}>
          {new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "Europe/Amsterdam",
          }).format(new Date(flag.updatedAt))}
        </td>
        <td
          className={tw`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8`}
        >
          <Button
            data-testid="FeatureFlag.toggle"
            onClick={() => {
              mutate({
                featureFlagId: flag.id,
                globalValue: !flag.globalValue,
                description: flag.description,
                tenantValues: flag.tenantValues,
              });
            }}
            type="button"
            className="w-[100px] items-center justify-center"
          >
            {flag.globalValue ? (
              <>
                Disable<span className={tw`sr-only`}>, {flag.name}</span>
              </>
            ) : (
              <>
                Enable<span className={tw`sr-only`}>, {flag.name}</span>
              </>
            )}
          </Button>
          {tenants && tenants.length > 0 && (
            <Button
              data-testid="FeatureFlag.editTenantSettings"
              onClick={() => setModeTenantSettings("edit")}
              type="button"
              className="w-[150px] ml-2 items-center justify-center"
              variant={"default"}
            >
              Tenant settings
              {Object.keys(flag.tenantValues ?? {}).length > 0 &&
                ` (${Object.keys(flag.tenantValues ?? {}).length})`}
              <span className={tw`sr-only`}>, {flag.name}</span>
            </Button>
          )}
        </td>
      </tr>

      <EditDescriptionFFModal
        flag={flag}
        show={modeDescription === "edit"}
        onClose={() => {
          setModeDescription("default");
        }}
      />

      {tenants && tenants.length > 0 && (
        <EditTenantSettingsFFModal
          flag={flag}
          tenants={tenants}
          show={modeTenantSettings === "edit"}
          onClose={() => {
            setModeTenantSettings("default");
          }}
        />
      )}
    </>
  );
}
