import { ClerkProvider, UserButton } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <UserButton afterSignOutUrl="/" />
      {children}
    </ClerkProvider>
  )
}
