import Link from "next/link";

interface BreadcrumbsProps {
  crumbs: Crumbdata[];
}

interface Crumbdata {
  text: string;
  link: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <ul className="absolute text-sm breadcrumbs top-16 left-1/4 md:bottom-0 md:left-16 text-text flex gap-2">
      {crumbs.map((crumb, index) => {
        return (
          <li className="flex gap-2" key={index}>
            <Link href={crumb.link}>
              <p>{crumb.text} </p>
            </Link>
            {index + 1 < crumbs.length ? (
              <span className="my-1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};
