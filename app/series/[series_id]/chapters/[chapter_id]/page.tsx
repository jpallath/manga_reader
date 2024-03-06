import Link from "next/link";
export default async function Page({ params }: { params: { id: string } }) {
  console.log("testing");
  return (
    <main>
      <Link href={`testing`}>testing</Link>;
    </main>
  );
}
