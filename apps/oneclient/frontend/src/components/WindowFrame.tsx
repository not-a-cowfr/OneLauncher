import { Maximize02Icon, MinusIcon, XCloseIcon } from '@untitled-theme/icons-react';

interface TitlebarButtonProps {
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	danger?: boolean;
}

function TitlebarButton(props: TitlebarButtonProps) {
	return (
		<button className="group h-8 w-8 flex items-center justify-center" onClick={props.onClick}>
			<div className="rounded-lg p-1 group-hover:bg-[#2A2D31]/50 group-hover:cursor-pointer">
				<props.icon className={`size-[20px] stroke-white/70 ${props.danger ? 'group-hover:stroke-danger' : 'group-hover:stroke-white'}`} />
			</div>
		</button>
	);
}

export default function WindowFrame() {
    const handleMinimize = () => console.log('Minimize window');
    const handleMaximize = () => console.log('Maximize window');
    const handleClose = () => console.log('Close window');
    
    return (
        <div className="z-[3169] absolute top-0 left-0 right-0">
            <div className="h-8 w-full flex flex-row items-center justify-between gap-0.5 p-10" data-tauri-drag-region>
                <div className="flex flex-row items-center">
					{/* TODO: change this too */}
                    <p className='select-none pl-3 text-white/70'>OneClient</p>
                </div>

                <div className="flex flex-row items-center justify-end gap-2">
                    <TitlebarButton icon={MinusIcon} onClick={handleMinimize} />
                    <TitlebarButton icon={Maximize02Icon} onClick={handleMaximize} />
                    <TitlebarButton danger icon={XCloseIcon} onClick={handleClose} />
                </div>
            </div>
        </div>
    )
}