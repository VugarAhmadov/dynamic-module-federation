"use client";

import { NavLink } from "@mantine/core";
import { IconAbacus, IconUsers } from "@tabler/icons-react";
import Link from "next/link";

import { useSelectedLayoutSegment } from "next/navigation";

export function Navigation() {
  const segment = useSelectedLayoutSegment() ?? "";

  return (
    <nav>
      {navLinks.map((link) => (
        <NavLink
          key={link.id}
          component={Link}
          label={link.label}
          leftSection={link.icon}
          href={`/${link.slug}`}
          active={segment === link.slug}
        />
      ))}
    </nav>
  );
}

const navLinks = [
  {
    id: 1,
    icon: <IconUsers style={{ width: "1.25rem", height: "1.25rem" }} />,
    label: "Users",
    slug: "users",
  },
  {
    id: 2,
    icon: <IconAbacus style={{ width: "1.25rem", height: "1.25rem" }} />,
    label: "Remotes",
    slug: "remotes",
  },
];
