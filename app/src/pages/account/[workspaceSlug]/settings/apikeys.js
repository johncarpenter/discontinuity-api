import { Fragment, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button/index";
import Card from "@/components/Card/index";
import Content from "@/components/Content/index";
import Meta from "@/components/Meta/index";
import { useApiKeys } from "@/hooks/data";
import { AccountLayout } from "@/layouts/index";
import api from "@/lib/common/api";
import { getWorkspace, isWorkspaceOwner } from "@/prisma/services/workspace";

const ApiKeys = ({ isTeamOwner, workspace }) => {
  const { data, isLoading } = useApiKeys(workspace.slug);
  const [keyname, setKeyname] = useState("");
  const [isSubmitting, setSubmittingState] = useState(false);

  const addApiKey = (event) => {
    event.preventDefault();
    setSubmittingState(true);
    api(`/api/workspace/${workspace.slug}/apikey`, {
      body: { permissions: "user", name: keyname },
      method: "POST",
    }).then((response) => {
      setSubmittingState(false);

      if (response.errors) {
        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        setKeyname("");
        toast.success("apikey successfully added to workspace!");
      }
    });
  };

  const handleapikeyChange = (event) => setKeyname(event.target.value);

  const removeApiKey = (id) => {
    api(`/api/workspace/${workspace.slug}/apikey`, {
      body: { id },
      method: "DELETE",
    }).then((response) => {
      if (response.errors) {
        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        toast.success("apikey successfully deleted from workspace!");
      }
    });
  };

  return (
    <AccountLayout>
      <Meta title={`${workspace.name} | API Keys`} />
      <Content.Title
        title="API Key Management"
        subtitle="Active API Keys for your workspace"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <Card.Body title="Manage API Keys">
            <table className="table-fixed">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th className="py-3 text-left">API Key</th>
                  <th className="text-left"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {!isLoading ? (
                  data?.apikeys.map((apikey, index) => (
                    <tr key={index}>
                      <td className="py-5">
                        <div className="flex flex-row items-center justify-start space-x-3">
                          <div className="flex flex-col">
                            <h3 className="font-bold">{apikey.name ?? " "}</h3>
                            <h4 className="text-gray-400">
                              {apikey.client_id}
                            </h4>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-row items-center justify-end space-x-3">
                          <h4>{apikey.client_secret}</h4>
                          {isTeamOwner && (
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="flex items-center justify-center p-3 space-x-3 rounded hover:bg-gray-100">
                                  <EllipsisVerticalIcon className="w-5 h-5" />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-20 mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded w-60">
                                  <div className="p-2">
                                    <Menu.Item>
                                      <button
                                        className="flex items-center w-full px-2 py-2 space-x-2 text-sm text-red-600 rounded hover:bg-red-600 hover:text-white"
                                        onClick={() => removeApiKey(apikey.id)}
                                      >
                                        <span>Remove API Key</span>
                                      </button>
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>
                      <div className="w-full h-8 bg-gray-400 rounded animate-pulse" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Content.Container>
      {isTeamOwner && (
        <>
          <Content.Divider thick />
          <Content.Container>
            <Card>
              <form>
                <Card.Body
                  title="Generate New API Key"
                  subtitle="API Keys are assigned to each workspace"
                >
                  <input
                    className="px-3 py-2 border rounded md:w-1/2"
                    disabled={isSubmitting}
                    onChange={handleapikeyChange}
                    placeholder="API Key Name"
                    type="text"
                    value={keyname}
                  />
                </Card.Body>
                <Card.Footer>
                  <span />
                  <Button
                    className="text-white bg-blue-600 hover:bg-blue-500"
                    disabled={isSubmitting}
                    onClick={addApiKey}
                  >
                    Add
                  </Button>
                </Card.Footer>
              </form>
            </Card>
          </Content.Container>
        </>
      )}
    </AccountLayout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  let isTeamOwner = false;
  let workspace = null;

  if (session) {
    workspace = await getWorkspace(
      session.user.userId,
      session.user.email,
      context.params.workspaceSlug
    );

    if (workspace) {
      const { host } = new URL(process.env.APP_URL);
      isTeamOwner = isWorkspaceOwner(session.user.email, workspace);
      workspace.host = host;
      workspace.hostname = `${workspace.slug}.${host}`;
    }
  }

  return {
    props: {
      isTeamOwner,
      workspace,
    },
  };
};

export default ApiKeys;
