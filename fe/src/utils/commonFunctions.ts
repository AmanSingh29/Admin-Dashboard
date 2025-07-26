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
        { label: "Logs", href: "/logs" },
      ];

    case "editor":
    case "viewer":
      return [{ label: "Posts", href: "/posts" }];

    default:
      return [];
  }
}
