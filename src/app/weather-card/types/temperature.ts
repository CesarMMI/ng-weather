export type TemperatureType = 'celsius' | 'fahrenheit';

export type TemperatureSymbol = 'ºC' | 'ºF';

export class Temperature {
	symbol: TemperatureSymbol;
	type: TemperatureType;

	private _value?: number;

	get value() {
		return this._value;
	}

	constructor(type: TemperatureType, valueKelvin?: number) {
		this.type = type;
		this.symbol = type === 'celsius' ? 'ºC' : 'ºF';
		if (typeof valueKelvin === 'number') {
			this.calcFromKelvin(valueKelvin);
		}
	}

	private calcFromKelvin(temperatureKelvin: number) {
		switch (this.type) {
			case 'celsius':
				this._value = Math.trunc(temperatureKelvin - 273.15);
				break;
			case 'fahrenheit':
				this._value = Math.trunc(((temperatureKelvin - 273.15) * 9) / 5 + 32);
				break;
		}
	}
}
