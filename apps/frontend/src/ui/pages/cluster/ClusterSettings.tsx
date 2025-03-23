import type { Cluster } from '@onelauncher/client/bindings';
import { useBeforeLeave } from '@solidjs/router';
import { bridge } from '~imports';
import ScrollableContainer from '~ui/components/ScrollableContainer';
import Sidebar from '~ui/components/Sidebar';
import useClusterContext from '~ui/hooks/useCluster';
import { tryResult } from '~ui/hooks/useCommand';
import useSettings from '~ui/hooks/useSettings';
import { type Accessor, Show } from 'solid-js';
import { createGameSetting, GameSettings, JvmSettings, LauncherSettings, ProcessSettings } from '../settings/game/SettingsMinecraft';

function ClusterSettings() {
	const [cluster] = useClusterContext();

	return (
		<Sidebar.Page>
			<h1>Game Settings</h1>
			<ScrollableContainer>
				<Show when={cluster() !== undefined}>
					{PageSettings(() => cluster()!)}
				</Show>
			</ScrollableContainer>
		</Sidebar.Page>
	);
}

function PageSettings(cluster: Accessor<Cluster>) {
	const { settings, save } = useSettings();

	// Game
	const fullscreen = createGameSetting(cluster().force_fullscreen, settings().force_fullscreen ?? false);
	const resolution = createGameSetting(cluster().resolution, settings().resolution);
	const memory = createGameSetting(cluster().memory, settings().memory);

	// Launcher

	// Process
	const preCommand = createGameSetting(cluster().init_hooks?.pre, settings().init_hooks.pre ?? '');
	const wrapperCommand = createGameSetting(cluster().init_hooks?.wrapper, settings().init_hooks.wrapper ?? '');
	const postCommand = createGameSetting(cluster().init_hooks?.post, settings().init_hooks.post ?? '');

	// JVM
	const javaVersion = createGameSetting<bridge.JavaVersion | null>(cluster().java?.custom_version || null);
	const javaVersions = createGameSetting(settings().java_versions);
	const javaArgs = createGameSetting(cluster().java?.custom_arguments, settings().custom_java_args);
	const envVars = createGameSetting(cluster().java?.custom_env_arguments, settings().custom_env_args);

	useBeforeLeave(() => {
		tryResult(() => bridge.commands.editGameSettings(cluster().uuid, {
			...cluster(),

			// Game
			force_fullscreen: fullscreen.getRaw(),
			resolution: resolution.getRaw(),
			memory: memory.getRaw(),

			// Process
			init_hooks: {
				pre: preCommand.getRaw(),
				wrapper: wrapperCommand.getRaw(),
				post: postCommand.getRaw(),
			},

			// JVM
			java: {
				custom_version: javaVersion.getRaw(),
				custom_arguments: javaArgs.getRaw(),
				custom_env_arguments: envVars.getRaw(),
			},
		}));

		save({
			...settings(),
			java_versions: javaVersions.get(),
		});
	});

	return (
		<>
			<GameSettings
				{...{
					fullscreen,
					memory,
					resolution,
				}}
			/>

			<LauncherSettings
				{...{
					hideOnLaunch: undefined,
					allowParallelClusters: undefined,
				}}
			/>

			<ProcessSettings
				{...{
					preCommand,
					wrapperCommand,
					postCommand,
				}}
			/>

			<JvmSettings
				{...{
					clusterId: cluster().uuid,
					javaVersion,
					javaVersions,
					javaArgs,
					envVars,
				}}
			/>
		</>
	);
}

export default ClusterSettings;
