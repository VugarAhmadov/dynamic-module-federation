import { NavLink } from "@mantine/core";
import { IconAbacus } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";

import { useUser } from "@host/hooks/use-user";

export function Navigation() {
  const { frontUrl } = useParams();

  const { data } = useUser();

  return (
    <nav>
      {data?.remotes.map((remote) => (
        <NavLink
          key={remote.id}
          to={remote.frontUrl}
          component={Link}
          label={remote.label}
          leftSection={
            <IconAbacus style={{ width: "1.25rem", height: "1.25rem" }} />
          }
          active={`/${frontUrl}` === remote.frontUrl}
        />
      ))}
    </nav>
  );
}
