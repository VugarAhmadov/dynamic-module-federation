import db from "@admin/libs/db";
import { RemotesList } from "./_components/list";

export default async function RemotesPage() {
  const remotes = await db.remote.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return <RemotesList remotes={remotes} />;
}
