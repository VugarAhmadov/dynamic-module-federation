import { NavLink } from "@mantine/core";
import { IconAbacus, IconUsers } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../../hooks/use-user";

export function Navigation() {
  const location = useLocation();

  const { data } = useUser();

  return (
    <nav>
      {data?.remotes.map((remote) => (
        <NavLink
          key={remote.id}
          to={remote.frontUrl}
          component={Link}
          label={remote.label}
          leftSection={<IconAbacus style={{ width: "1.25rem", height: "1.25rem" }} />}
          active={location.pathname.split("/")[1] === remote.frontUrl}
        />
      ))}
    </nav>
  );
}
