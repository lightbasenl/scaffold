import { Transition, Dialog, Portal } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { tw } from "twind";
import Button from "../components/Button";
import type { ManagementFeatureFlagItem } from "../generated/common/types";
import { useManagementFeatureFlagUpdate } from "../generated/managementFeatureFlag/reactQueries";

export default function EditFeatureFlagModal({
  show,
  onClose,
  flag,
}: {
  show: boolean;
  onClose: () => void;
  flag: ManagementFeatureFlagItem;
}) {
  const { mutate, isLoading, error } = useManagementFeatureFlagUpdate(
    {
      onSuccess: () => {
        onClose();
      },
    },
    { invalidateQueries: true },
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: flag.description,
    },
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
                  data-testid="FeatureFlag.modal"
                  onSubmit={handleSubmit(({ description }) => {
                    mutate({
                      featureFlagId: flag.id,
                      description,
                      globalValue: flag.globalValue,
                    });
                  })}
                  className={tw`relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg`}
                >
                  <div className={tw`bg-white`}>
                    <div className={tw`border-b bg-white p-4 shadow-sm`}>
                      <Dialog.Title className={tw`font-medium`}>Edit feature flag</Dialog.Title>
                    </div>
                    <div className={tw`p-4 sm:p-6`}>
                      <div className={tw`space-y-4`}>
                        <div className={tw`group space-y-1`}>
                          <label
                            htmlFor="description"
                            className={tw`text-xs text-gray-600 group-focus-within:text-blue-700`}
                          >
                            Description
                          </label>
                          <input
                            id="description"
                            className={tw`block w-full rounded-lg px-3 py-3 text-gray-600 shadow-inner ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("description")}
                          />
                        </div>
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
                    <Button data-testid="FeatureFlag.modal.submit" type="submit" isLoading={isLoading}>
                      Save
                    </Button>
                    <Button variant="default" className="ml-2 lg:ml-0 lg:mr-2" onClick={onClose}>
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
