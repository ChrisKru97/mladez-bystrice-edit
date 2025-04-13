import EditSongPage from '@/app/song/_components/Page';
import {Suspense} from "react";

export default function Page() {
  return <Suspense fallback={null}><EditSongPage /></Suspense>;
}
