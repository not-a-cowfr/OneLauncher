import type { Settings } from '@onelauncher/client/bindings';
import { getProgramInfo } from '@onelauncher/client';
import { useBeforeLeave } from '@solidjs/router';
import { bridge } from '~imports';
import { DEFAULT_THEME, setAppTheme, splitMergedTheme } from '~utils/theming';
import { type Accessor, type Context, createContext, createEffect, createSignal, on, type ParentProps, type Setter, Show, type Signal, useContext } from 'solid-js';
import useCommand, { tryResult } from './useCommand';

/**
 * Sync the launcher state (CSS, text etc) with the current settings
 */
export function syncSettings(settings: Settings) {
	document.body.classList.toggle('reduce-motion', settings.disable_animations);

	const split = splitMergedTheme(settings.theme || DEFAULT_THEME);
	setAppTheme(split.theme, split.variant);
}

interface SettingsControllerType {
	settings: Accessor<Settings>;
	saveChangedSettings: () => Promise<void>;
	settingsToSave: Accessor<Partial<Settings> | null>;
	setSettingsToSave: (settings: Partial<Settings> | null) => void;
	settingsChanged: Accessor<boolean>;
	setSettingsChanged: Setter<boolean>;
	save: (settings: Settings) => Promise<void>;
	refetch: () => void;
	createSetting: <K extends keyof Settings, V = Settings[K]>(name: K, value: V) => Signal<V>;
}

const SettingsContext = createContext() as Context<SettingsControllerType>;

export function SettingsProvider(props: ParentProps) {
	const [settings, { refetch }] = useCommand(() => bridge.commands.getSettings());
	const [settingsChanged, setSettingsChanged] = createSignal(false);
	const [settingsToSave, setSettingsToSave] = createSignal<Partial<Settings> | null>(null);

	createEffect(() => {
		if (settings !== undefined && settings() !== undefined)
			syncSettings(settings!()!);
	});

	useBeforeLeave(() => {
		setSettingsChanged(false);
	});

	const controller: SettingsControllerType = {
		settings: () => settings!()!,
		saveChangedSettings: async () => {
			await controller.save({
				...settings(),
				...((settingsToSave() ?? {}) as Settings),
			});

			setSettingsChanged(false);
		},
		settingsToSave,
		setSettingsToSave: (settings) => {
			setSettingsToSave(settings);
			setSettingsChanged(true);
		},
		settingsChanged,
		setSettingsChanged,
		save: async (settings) => {
			try {
				await tryResult(() => bridge.commands.setSettings(settings));
				syncSettings(settings);
				await refetch();
			}
			catch (err) {
				console.error(err);
			}
		},
		refetch,
		createSetting: (name, v) => {
			const [value, setValue] = createSignal(v);

			createEffect(on(value, (value) => {
				const didChange = settings()?.[name] !== value;

				if (didChange) {
					setSettingsToSave(prev => ({
						...prev,
						[name]: value,
					}));

					setSettingsChanged(true);
				}
			}));

			return [value, setValue];
		},
	};

	if (getProgramInfo().dev_build)
		// @ts-expect-error - Expose settings globally for debugging purposes
		window.onelauncherSettings = controller;

	return (
		<Show when={settings !== undefined && settings() !== undefined}>
			<SettingsContext.Provider value={controller}>
				{props.children}

				<Show when={settingsChanged()}>
					<div class="pointer-events-none absolute bottom-5 left-1/2 w-full flex flex-col items-center justify-center -translate-x-1/2">
						<div class="pointer-events-auto flex flex-row gap-1 border border-border/10 rounded-md bg-component-bg p-3 px-4 shadow-black shadow-sm shadow-op-30">
							You have unsaved changes!
							<button class="text-brand filter-brightness-130 hover:underline" onClick={controller.saveChangedSettings}>Save Now</button>
						</div>
					</div>
				</Show>
			</SettingsContext.Provider>
		</Show>
	);
}

export function useSettings() {
	const context = useContext(SettingsContext);

	if (!context)
		throw new Error('useSettingsContext should be called inside its SettingsProvider');

	return context;
}

export default useSettings;
