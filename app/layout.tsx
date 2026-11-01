import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Umer Shahzaib | Frontend Developer & AI Specialist',
  description: 'Building Digital Experiences at the Intersection of Code & AI.',
  keywords: 'Frontend Developer, Full-Stack Developer, AI Developer, React, Next.js, AI Agents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
