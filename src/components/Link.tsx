import React from "react";

const Link: React.FC<{ href: string; className?: string; children: any }> = ({
  href,
  className,
  children,
}) => {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
