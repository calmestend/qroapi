import { Body, Controller, Post } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
	constructor(private readonly directionsService: DirectionsService) { }

	@Post()
	async getDirections(@Body() directionsBody: { url: string }) {
		return await this.directionsService.getDirections(directionsBody.url);
	}
}
