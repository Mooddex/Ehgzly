'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { makeStore, AppStore } from '../lib/store'

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </SessionProvider>
  )
}