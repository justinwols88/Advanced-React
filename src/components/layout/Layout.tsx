import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-white to-blue-50/30">
      <Header />
      <main className="flex-1 pt-[80px] relative z-0">
        <div className="min-h-[calc(100vh-80px-400px)]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout;