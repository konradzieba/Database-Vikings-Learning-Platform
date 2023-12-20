import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatDuration(durationInSeconds: number) {
	const durationObj = dayjs.duration(durationInSeconds, 'seconds');
	const days = durationObj.days();
	const hours = durationObj.hours();
	const minutes = durationObj.minutes();
	const seconds = durationObj.seconds();

	const formattedDuration = [];
	if (days > 0) formattedDuration.push(`${days} dni`);
	if (hours > 0) formattedDuration.push(`${hours} godz.`);
	if (minutes > 0) formattedDuration.push(`${minutes} min.`);
	if (seconds > 0) formattedDuration.push(`${seconds} sek.`);

	return formattedDuration.join(' ');
}
