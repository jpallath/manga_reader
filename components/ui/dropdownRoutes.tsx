"use client";

import Link from "next/link";
import { useState } from "react";

export interface Route {
  text: string;
  link: string;
}

export interface DropdownRoutesProps {
  topic: string;
  routes: Route[];
}

export const DropdownRoutes: React.FC<DropdownRoutesProps> = ({
  topic,
  routes,
}) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`text-text transition-all duration-100 ease-in-out h-fit
      }`}
    >
      <h1
        className="bg-primary py-2 px-5 m-2 rounded-xl border-secondary border-4 hover:border-primary hover:bg-secondary transition-all text-text"
        onClick={() => setActive(!active)}
      >
        {topic}
      </h1>
      <ul>
        {routes.map((route, idx) => {
          return (
            <li
              className={`transition-all duration-150 ease-in-out ${
                active ? " opacity-100" : "  opacity-0"
              }`}
            >
              <Link href={route.link}>{route.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
