import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='z-10 pt-16 [view-transition-name:main-content]'>

      <div className='flex items-center justify-center pt-16'>
        <div className="flex items-center gap-4">
          <button style={{ viewTransitionName: "launch-button" }} className="bg-brand hover:cursor-pointer select-none text-white px-20 py-2 rounded-xl flex flex-col items-center justify-center transition-colors hover:bg-brand-hover active:bg-brand-pressed">
            <span className='text-xl font-extrabold'>LAUNCH</span>
            <span className='text-xs'>Forge 1.8.9</span>
          </button>
        </div>
      </div>
      
    </div>
  )
}
