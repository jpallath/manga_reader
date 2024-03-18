"use client";
import Link from "next/link";
import { LinkButton } from "./linkButton";
import { useState } from "react";
import { signIn } from "next-auth/react";

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
            ? "left-0 opacity-85 border-r-seconddary border-r-8 rounded-r-sm"
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
          <LinkButton text="Admin" link="/admin" />
          <LinkButton text="Home" link="/" />
        </ul>
      </button>
      <div
        onClick={() => signIn("google")}
        className="bg-primary py-8 px-5 m-2 rounded-xl border-secondary border-4 hover:border-primary hover:bg-secondary transition-all text-text hover:text-background absolute bottom-4 group cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 transition-all"
        >
          <path
            d="M21.71 6.53019L20.29 5.12019L21.71 3.71019C21.8983 3.52188 22.0041 3.26649 22.0041 3.00019C22.0041 2.73388 21.8983 2.47849 21.71 2.29019C21.5217 2.10188 21.2663 1.99609 21 1.99609C20.7337 1.99609 20.4783 2.10188 20.29 2.29019L9.75 12.8302C8.71605 12.148 7.46567 11.8739 6.24117 12.0611C5.01667 12.2482 3.90522 12.8832 3.12219 13.843C2.33916 14.8029 1.94029 16.0192 2.00288 17.2563C2.06547 18.4935 2.58506 19.6633 3.46096 20.5392C4.33687 21.4151 5.50673 21.9347 6.74386 21.9973C7.981 22.0599 9.19732 21.661 10.1572 20.878C11.117 20.095 11.752 18.9835 11.9391 17.759C12.1262 16.5345 11.8522 15.2841 11.17 14.2502L16.05 9.36019L17.46 10.7802C17.5534 10.8729 17.6643 10.9462 17.7861 10.996C17.9079 11.0457 18.0384 11.0709 18.17 11.0702C18.3016 11.0709 18.4321 11.0457 18.5539 10.996C18.6758 10.9462 18.7866 10.8729 18.88 10.7802C18.9737 10.6872 19.0481 10.5766 19.0989 10.4548C19.1497 10.3329 19.1758 10.2022 19.1758 10.0702C19.1758 9.93817 19.1497 9.80747 19.0989 9.68561C19.0481 9.56375 18.9737 9.45315 18.88 9.36019L17.46 8.00019L18.88 6.58019L20.29 8.00019C20.3834 8.09287 20.4943 8.16619 20.6161 8.21596C20.7379 8.26572 20.8684 8.29095 21 8.29019C21.1316 8.29095 21.2621 8.26572 21.3839 8.21596C21.5058 8.16619 21.6166 8.09287 21.71 8.00019C21.8115 7.90654 21.8925 7.79289 21.9479 7.66639C22.0033 7.53989 22.0319 7.40329 22.0319 7.26519C22.0319 7.12708 22.0033 6.99048 21.9479 6.86398C21.8925 6.73748 21.8115 6.62383 21.71 6.53019ZM7 20.0002C6.40666 20.0002 5.82664 19.8242 5.33329 19.4946C4.83995 19.1649 4.45543 18.6964 4.22837 18.1482C4.0013 17.6001 3.94189 16.9969 4.05765 16.4149C4.1734 15.833 4.45913 15.2984 4.87868 14.8789C5.29824 14.4593 5.83279 14.1736 6.41473 14.0578C6.99668 13.9421 7.59988 14.0015 8.14806 14.2285C8.69623 14.4556 9.16477 14.8401 9.49441 15.3335C9.82406 15.8268 10 16.4068 10 17.0002C10 17.7958 9.68393 18.5589 9.12133 19.1215C8.55872 19.6841 7.79565 20.0002 7 20.0002Z"
            className="fill-text transition-all group-hover:fill-background"
          />
        </svg>

        <p>Login / Register</p>
      </div>
    </div>
  );
};
