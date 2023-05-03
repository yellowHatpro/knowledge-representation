import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {TableProvider} from "@/context/table_context";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <TableProvider>
            <Component {...pageProps} />
        </TableProvider>
      </>
  )
}
