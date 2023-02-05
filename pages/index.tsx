import Head from 'next/head'

export default function Home () {
  return (
    <>
      <Head>
        <title>Incridea</title>
        <meta name='description' content='Official website for Incridea 2023' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex bg-gray-900 h-screen w-screen items-center justify-center text-5xl font-semibold'>
        <span className='animate-bounce text-white'>Incridea &apos;23</span>
      </main>
    </>
  )
}
