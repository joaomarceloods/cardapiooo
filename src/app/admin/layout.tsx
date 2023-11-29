import LayoutClient from './layout-client'

export default function Layout({ children }: { children: React.ReactNode }) {
  // antd requires 'use client' directive, so I implemented the whole layout in a Client Component called LayoutClient
  return <LayoutClient>{children}</LayoutClient>
}
