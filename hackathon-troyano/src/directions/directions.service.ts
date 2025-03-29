import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class DirectionsService {
	async getDirections(url: string) {
		try {
			const browser = await puppeteer.launch({
				headless: true,
				args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
			});
			const page = await browser.newPage();

			await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36');
			await page.setViewport({ width: 1280, height: 800 });

			const responses: Array<{ url: string; body: string }> = [];

			page.on('response', async response => {
				const requestUrl = response.request().url();
				let body: string;
				try {
					body = await response.text();
				} catch (error) {
					body = 'No se pudo obtener el cuerpo de la respuesta';
				}
				responses.push({ url: requestUrl, body });
			});

			await page.goto(url, { waitUntil: 'networkidle0' });

			const routeResponse = responses.find(r => r.url.startsWith('https://moovitapp.com/api/route/result'));

			await browser.close();
			if (routeResponse?.body) {
				const body = JSON.parse(routeResponse?.body);
				console.log(JSON.stringify(body.results[3]))
				return body.results[3]
			}
		} catch (error) {
			console.error(error);
		}
	}
}

