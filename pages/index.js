// pages/index.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MustRead from "@layouts/components/MustRead";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js Page</title>
      </Head>
      <h1>Welcome to Next.js!</h1>
          <MustRead/>

      <p>This is a simple example of a Next.js page.</p>
      <Link href="/about">
        <a>Go to About page</a>
      </Link>
    </div>
  )
}
