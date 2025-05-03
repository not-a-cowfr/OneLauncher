import { createFileRoute } from '@tanstack/react-router'
import { ChevronSelectorVerticalIcon } from '@untitled-theme/icons-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center px-16 z-10 relative [view-transition-name:main-content]">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold text-white">SKYBLOCK</h1>
          <p className="text-xl text-white/80 mb-4">1.21.4 Forge</p>

          <div className="flex items-center gap-4">
            <button style={{ viewTransitionName: "launch-button" }} className="bg-brand hover:cursor-pointer select-none text-white px-20 py-2 rounded-xl flex flex-col items-center justify-center transition-colors hover:bg-brand-hover active:bg-brand-pressed">
              <span className='text-xl font-extrabold'>LAUNCH</span>
              <span className='text-xs'>Forge 1.8.9</span>
            </button>

            <button className="px-3 hover:bg-fg-secondary-hover/20 py-3 hover:cursor-pointer rounded-md transition-colors">
              <span className="text-lg text-component-bg"><ChevronSelectorVerticalIcon /></span>
            </button>
          </div>
        </div>
      </div>

      <div className='z-10 bg-transparent w-full'>
        <p>still a demo layout not a final design</p>
      </div>
    </>
  )
}
