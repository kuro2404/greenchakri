import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HeaderText from '@/components/HeaderText'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);
  return (
    <>
      <Head>
        <title>Chakri - Casino Wheel</title>
        <meta name="description" content="Casino Wheel that spins and stops, with developer cheats and admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderText/>
      
      
    </>
  )
}
