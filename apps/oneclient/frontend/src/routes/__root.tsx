import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import WindowFrame from '@/components/WindowFrame'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="max-h-screen min-h-screen w-full flex flex-col text-fg-primary flex-1 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          // TODO: change to something else
          backgroundImage: 'url(https://github.com/emirsassan.png)',
          filter: 'brightness(0.7)'
        }}
      />
      <WindowFrame />

      <Outlet />

      {/* <TanStackRouterDevtools />

      <TanstackQueryLayout /> */}
    </div>
  ),
})
