import Link from "next/link";
interface LinkComponentProps {
  text: string;
  link: string;
}
export const LinkButton: React.FC<LinkComponentProps> = ({ text, link }) => {
  return (
    <Link
      href={link}
      className="bg-primary py-2 px-5 m-2 rounded-xl border-secondary border-4 hover:border-primary hover:bg-secondary transition-all text-text"
    >
      <p className="">{text}</p>
    </Link>
  );
};
