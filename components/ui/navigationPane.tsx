"use client";
import Link from "next/link";
import { useState } from "react";

export const NavigationPane = () => {
  const [click, setClick] = useState(false);
  const drawerComponent = () => {
    if (click) {
      return <button onClick={() => setClick(!click)}>test</button>;
    } else {
      return <></>;
    }
  };
  return (
    <div
      className={`absolute w-2/6 h-full transition-all flex items-center justify-center  bg-background z-10 
        ${
          click
            ? "left-0 opacity-85 border-r border-r-accent rounded-r-xl"
            : "-left-1/4 opacity-70 bg-background"
        }`}
    >
      <button
        className="absolute top-4 right-0 bg-text rounded-lg"
        onClick={() => setClick(!click)}
      >
        {click ? (
          <svg
            className="sfill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        ) : (
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        )}
      </button>
      <button>
        <ul className="flex flex-col">
          <Link href="/admin">
            <p className="text-text">Admin</p>
          </Link>
          <Link href="/">
            <p className="text-text">Home</p>
          </Link>
        </ul>
      </button>
    </div>
  );
};
