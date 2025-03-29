import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
	async search(lat: number, lng: number, query: string) {
		const res = await fetch("https://moovitapp.com/index/api/location/search", {
			"headers": {
				"content-type": "application/json",
			},
			"body": `{"userKey":"F42248","query":"${query}","metroId":3143,"metroURL":"Queretaro","lat":${lat},"lng":${lng}}`,
			"method": "POST"
		});

		const json = await res.json();
		console.log(json)
		return json
	}
}
