import { useRouter } from "next/router";
import { FC } from "react";

export const NavLink: FC<{ href: string; locale: string; onClick?: Function }> =
  ({ children, href, locale, onClick }) => {
    const router = useRouter();

    const handleClick = (event: any) => {
      event.preventDefault();

      if (href === "imprint" || href === "sitemap" || href === "privacy") {
        router.push(`${href}`);
      } else {
        router.push(`/#${href}`);
      }
      onClick?.();
    };

    return <a onClick={handleClick}>{children}</a>;
  };
