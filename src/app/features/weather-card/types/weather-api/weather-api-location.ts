export type WeatherApiLocationResponse = {
	name: string;
	local_names: { [local: string]: string };
	lat: number;
	lon: number;
	country: string;
	state: string;
};
