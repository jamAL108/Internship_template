import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ToastProvider from "./toast.provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Votum',
  description: 'A Law firm app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </ToastProvider>
        <Toaster/>
        </body>
    </html>
  )
}
