import EditSongPage from './_components/Page';

export const generateStaticParams = async () => {
  return []
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditSongPage id={id} />
}
