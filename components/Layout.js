import Head from 'next/head'

export default function Layout({ children, title = 'Default title' }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
      </Head>
      <main className="flex flex-1 justify-center items-center flex-col">
        { children }
      </main>
      <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        footer
      </footer>
    </div>
  )
}
