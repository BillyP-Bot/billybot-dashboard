import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import type { IServer } from "@types";
import { ServerIcon } from "./ServerIcon";
import { ServerInfo } from "./ServerInfo";
import { constants } from "@utils";
import { Loader } from "@components/Loader";
import { useServerInfoStore } from "@store/useServerInfo";
import { Separator } from "@components/Separator";

export const ServerCard = () => {
	const { serverInfoCache } = useServerInfoStore();
	const [server, setServer] = useState<IServer>();

	useEffect(() => {
		serverInfoCache && setServer(serverInfoCache);
	}, [serverInfoCache]);

	if (!server) {
		return (
			<div className="min-h-screen pt-10 m-auto text-center">
				<Loader />
			</div>
		);
	}

	return (
		<>
			<Card className="mt-5" style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<div className="pb-2">
						<ServerIcon
							name={server.name}
							server_id={server.server_id}
							icon_hash={server.icon_hash}
						/>
						<div className="inline-flex text-2xl font-extrabold text-theme-gray font-content">
							{server.name}
						</div>
					</div>
					<div className="max-w-[400px]">
						<Separator />
						<ServerInfo
							member_count={server.user_count}
							allowance_rate={server.settings.allowance_rate}
							birthday_bucks={server.settings.birthday_bucks}
						/>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
