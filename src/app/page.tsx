import Main from "@/components/Main";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    query: string;
    page: string;
  };
}) {
  return <Main searchParams={searchParams} />;
}
