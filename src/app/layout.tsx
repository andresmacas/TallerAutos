import type { Metadata } from 'next'
import { PrimeReactProvider } from 'primereact/api'
import { Geist_Mono, Geist, Roboto } from 'next/font/google'
import './globals.css'


import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/arya-orange/theme.css'
import 'primeicons/primeicons.css'

import { Navigator } from '@/components/Navigator'
import { ConfirmDialogGeneral } from '@/components/ConfirmDialog'
import { ToastGeneral } from '@/components/ToastGeneral'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin']
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'Vinicar',
  description: 'Sistema de gestión de ordenes de trabajo para taller mecánico vinicar',
  icons: {
    icon: '/logo.ico'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {



  const value = {
    ripple: true
  }


  return (
    <html lang="es">
      <PrimeReactProvider value={value}>
        <body className={`${geistMono.variable} ${roboto.variable} ${geist.variable} text-center z-1 relative `}>
          <header className=' p-1 flex align-items-center text-white h-5rem gap-5 shadow-gray-50 shadow'>
            <img src="logo.png" alt="" className='w-8rem overflow-hidden ml-8 z-1' />
            <h1 className='z-1 text-4xl hidden md:block' >Autocolisiones</h1>
          </header>
          <main className='align-items-center flex flex-column'>
            {children}
          </main>
          <ConfirmDialogGeneral />
          <ToastGeneral />
          <Navigator />
        </body>
      </PrimeReactProvider>
    </html>
  )
}
