import Link from "next/link";
interface LinkComponentProps {
  text: string;
  link: string;
}
export const LinkButton: React.FC<LinkComponentProps> = ({ text, link }) => {
  return (
    <Link
      href={link}
      className="bg-primary py-5 px-20 m-2 rounded-xl border-secondary border-4 hover:border-primary hover:bg-secondary transition-all text-text hover:text-background"
    >
      <p className="">{text}</p>
    </Link>
  );
};
