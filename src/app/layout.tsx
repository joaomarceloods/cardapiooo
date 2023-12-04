import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cardapiooo',
  description: "Your restaurant's online menu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={`${inter.className} ${styles.body}`}>{children}</body>
    </html>
  )
}
