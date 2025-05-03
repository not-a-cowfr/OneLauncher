import { Maximize02Icon, MinusIcon, XCloseIcon } from '@untitled-theme/icons-react';
import PolyfrostLogo from "@/assets/polyfrost.svg";
import { Link } from '@tanstack/react-router';

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
		<div className="z-[3169] absolute top-0 left-0 right-0 select-none">
			<div className="h-8 w-full flex flex-row items-center justify-between gap-0.5 p-10" data-tauri-drag-region>
				<div className="flex flex-row items-center select-none">
					<img src={PolyfrostLogo} className='w-38' />
				</div>

				<div className='flex flex-row items-center gap-8'>
					<Link to="/">
						<p className='text-white/80'>Home</p>
					</Link>

					<Link to="/settings">
						<p className='text-white/80'>Settings</p>
					</Link>
					<p className='text-white/80'>Friends?</p>
				</div>

				<div className="flex flex-row items-center justify-end gap-2">
					{/* i know this is a dumb way to center the logo when view transition happens
						but i dont want to fix this so for now it'll be like this
						if anyone wants to fix this do it */}
					<div className='size-[20px] w-8' />
					<TitlebarButton icon={MinusIcon} onClick={handleMinimize} />
					<TitlebarButton icon={Maximize02Icon} onClick={handleMaximize} />
					<TitlebarButton danger icon={XCloseIcon} onClick={handleClose} />
				</div>
			</div>
		</div>
	)
}