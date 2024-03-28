import { Dialog, Portal, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { tw } from "twind";
import Button from "../components/Button";
import type { ManagementFeatureFlagItem } from "../generated/common/types";
import { useManagementFeatureFlagUpdate } from "../generated/managementFeatureFlag/reactQueries";

export default function EditTenantSettingsFFModal({
  show,
  onClose,
  flag,
  tenants,
}: {
  show: boolean;
  onClose: () => void;
  flag: ManagementFeatureFlagItem;
  tenants: string[];
}) {
  const { mutate, status, error } = useManagementFeatureFlagUpdate(
    {
      onSuccess: () => {
        onClose();
      },
    },
    { invalidateQueries: true },
  );

  const [tenantValues, setTenantValues] = useState({
    ...(flag.tenantValues ?? {}),
  });

  return (
    <Portal>
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className={tw`relative z-10`} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter={tw`ease-out duration-300`}
            enterFrom={tw`opacity-0`}
            enterTo={tw`opacity-100`}
            leave={tw`ease-in duration-200`}
            leaveFrom={tw`opacity-100`}
            leaveTo={tw`opacity-0`}
          >
            <div className={tw`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`} />
          </Transition.Child>

          <div className={tw`fixed inset-0 z-10 overflow-y-auto`}>
            <div
              className={tw`flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0`}
            >
              <Transition.Child
                as={Fragment}
                enter={tw`ease-out duration-300`}
                enterFrom={tw`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`}
                enterTo={tw`opacity-100 translate-y-0 sm:scale-100`}
                leave={tw`ease-in duration-200`}
                leaveFrom={tw`opacity-100 translate-y-0 sm:scale-100`}
                leaveTo={tw`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`}
              >
                <Dialog.Panel
                  as="form"
                  data-testid="TenantSettingsFeatureFlag.modal"
                  onSubmit={e => {
                    e.preventDefault();
                    mutate({
                      featureFlagId: flag.id,
                      tenantValues,
                      globalValue: flag.globalValue,
                      description: flag.description,
                    });
                  }}
                  className={tw`relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg`}
                >
                  <div className={tw`bg-white`}>
                    <div className={tw`border-b bg-white p-4 shadow-sm`}>
                      <Dialog.Title className={tw`font-medium`}>Edit feature flag</Dialog.Title>
                    </div>
                    <div className={tw`p-4 sm:p-6`}>
                      <div className={tw`space-y-4`}>
                        {tenants.map((tenant, index) => (
                          <div key={`${flag.name}-${index}`} className={tw`group space-y-1`}>
                            <h3 className={tw`mb-2 font-semibold text-sm text-gray-900`}>{tenant}</h3>
                            <ul
                              className={tw`items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex`}
                            >
                              <li className={tw`w-full border-b border-gray-200 sm:border-b-0 sm:border-r`}>
                                <div className={tw`flex items-center pl-3`}>
                                  <input
                                    id={`list-radio-${tenant}-${index}-global-value`}
                                    type="radio"
                                    name={`list-radio-${tenant}-${index}-global-value`}
                                    checked={!tenantValues.hasOwnProperty(tenant)}
                                    onClick={() => {
                                      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                                      const { [tenant]: remove, ...rest } = tenantValues;
                                      setTenantValues(rest);
                                    }}
                                    className={tw`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300`}
                                  />
                                  <label
                                    htmlFor={`list-radio-${tenant}-${index}-global-value`}
                                    className={tw`w-full py-3 ml-2 text-sm font-medium text-gray-900 select-none`}
                                  >
                                    Global value
                                  </label>
                                </div>
                              </li>
                              <li className={tw`w-full border-b border-gray-200 sm:border-b-0 sm:border-r`}>
                                <div className={tw`flex items-center pl-3`}>
                                  <input
                                    id={`list-radio-${tenant}-${index}-enabled`}
                                    type="radio"
                                    name={`list-radio-${tenant}-${index}-enabled`}
                                    checked={tenantValues.hasOwnProperty(tenant) && tenantValues[tenant]}
                                    onClick={() => setTenantValues({ ...tenantValues, [tenant]: true })}
                                    className={tw`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300`}
                                  />
                                  <label
                                    htmlFor={`list-radio-${tenant}-${index}-enabled`}
                                    className={tw`w-full py-3 ml-2 text-sm font-medium text-gray-900 select-none`}
                                  >
                                    Enabled
                                  </label>
                                </div>
                              </li>
                              <li className={tw`w-full border-b border-gray-200 sm:border-b-0`}>
                                <div className={tw`flex items-center pl-3`}>
                                  <input
                                    id={`list-radio-${tenant}-${index}-disabled`}
                                    type="radio"
                                    name={`list-radio-${tenant}-${index}-disabled`}
                                    checked={tenantValues.hasOwnProperty(tenant) && !tenantValues[tenant]}
                                    onClick={() => setTenantValues({ ...tenantValues, [tenant]: false })}
                                    className={tw`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300`}
                                  />
                                  <label
                                    htmlFor={`list-radio-${tenant}-${index}-disabled`}
                                    className={tw`w-full py-3 ml-2 text-sm font-medium text-gray-900 select-none`}
                                  >
                                    Disabled
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        ))}
                        {!!error && (
                          <div className={tw`rounded-md bg-red-50`}>
                            <p className={tw`p-4 text-sm font-medium text-red-800`} role="alert">
                              Something went wrong
                            </p>
                            {!!error.response?.data && (
                              <div
                                className={tw`max-h-[100px] overflow-y-auto p-4 shadow-inner`}
                                aria-hidden="true"
                              >
                                <pre className={tw`whitespace-pre-line text-sm text-red-800`}>
                                  {JSON.stringify(error.response.data)}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={tw`border-t px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6`}>
                    <Button
                      data-testid="TenantSettingsFeatureFlag.modal.submit"
                      type="submit"
                      isLoading={
                        // Compatible between RQ4 & RQ5
                        ["loading", "pending"].includes(status as string)
                      }
                    >
                      Save
                    </Button>
                    <Button
                      variant="default"
                      className={tw`ml-2 lg:ml-0 lg:mr-2`}
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Portal>
  );
}
