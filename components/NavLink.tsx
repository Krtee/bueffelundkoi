import { useRouter } from "next/router";
import { FC } from "react";

export const NavLink: FC<{ href: string; locale: string }> = ({
  children,
  href,
  locale,
}) => {
  const router = useRouter();

  const handleClick = (event: any) => {
    event.preventDefault();
    router.push("/", `${locale}${href}`, {
      scroll: false,
      shallow: true,
      locale: false,
    });
  };

  return <a onClick={handleClick}>{children}</a>;
};
