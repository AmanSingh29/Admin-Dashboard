type NavItem = {
  label: string;
  href: string;
};

export function getNavItemsByRole(
  role: string | undefined
): NavItem[] {
  switch (role) {
    case "admin":
      return [
        { label: "Users", href: "/users" },
        { label: "Posts", href: "/posts" },
        { label: "Logs", href: "/logs" },
      ];

    case "editor":
    case "viewer":
      return [{ label: "Posts", href: "/dashboard/editor/posts" }];

    default:
      return [];
  }
}
