import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StateContextProvider } from '@/providers'
import { Navbar } from '@/components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoCommerce',
  description: 'No Counterfeiting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <StateContextProvider>
          <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-grow'>
              {children}
            </div>
            <Footer />
          </div>
        </StateContextProvider>
      </body>
    </html>
  )
}
