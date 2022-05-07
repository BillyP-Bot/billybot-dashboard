import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import type { IAnnouncement } from "@types";
import { constants, readableDate, readableTime } from "@utils";

interface IAnnouncementCardProps {
	announcement: IAnnouncement
}

const Timestamp = ({ date }: { date: Date }) => {
	return (
		<div className="pl-3 text-[11px] italic text-theme-gray">
			<div className="inline-flex pr-1 font-bold align-middle">
				{
					readableDate(new Date(date).toISOString())
				}
			</div>
			:
			<div className="inline-flex pl-1 font-bold align-middle">
				{
					readableTime(new Date(date).toISOString())
				}
			</div>
		</div>
	);
};

const PosterInfo = ({ announcement }: { announcement: IAnnouncement }) => {
	return (
		<div className="inline-flex pr-1 text-theme-gray">
			- {announcement.user.username}
			<div className="inline-flex pl-1 pt-1 text-[13px] italic align-middle">
				#
			</div>
			<div className="inline-flex pt-1 pl-0.5 text-[11px] italic align-middle">
				{announcement.channel_name}
			</div>
		</div>
	);
};

export const AnnouncementCard: React.FC<IAnnouncementCardProps> = ({
	announcement
}: IAnnouncementCardProps): JSX.Element => {
	return (
		<Card
			className="mt-5 font-medium"
			style={{ backgroundColor: constants.THEME.BLACK }}
		>
			<CardContent>
				<div className="p-2 rounded-md bg-theme-dark-black text-theme-gray">
					{announcement.text}
				</div>
				<Divider className="mt-2 mb-2" style={{ backgroundColor: constants.THEME.GRAY }} />
				<PosterInfo announcement={announcement} />
				<Timestamp date={announcement.created_at} />
			</CardContent>
		</Card>
	);
};