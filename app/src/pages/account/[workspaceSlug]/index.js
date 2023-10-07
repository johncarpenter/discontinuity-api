import Content from "@/components/Content/index";
import Meta from "@/components/Meta/index";
import { AccountLayout } from "@/layouts/index";
import { useWorkspace } from "@/providers/workspace";

const Workspace = () => {
  const { workspace } = useWorkspace();

  return (
    workspace && (
      <AccountLayout>
        <Meta title={`Discontinuity.AI - ${workspace.name} | Dashboard`} />
        <Content.Title
          title={workspace.name}
          subtitle="This is your project's workspace"
        />
        Projects go here. add.remove
        <Content.Divider />
        <Content.Container />
      </AccountLayout>
    )
  );
};

export default Workspace;
