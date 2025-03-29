import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) { }

	@Post()
	async search(@Body() request: { lat: number, lng: number, query: string }) {
		const { lat, lng, query } = request;
		return await this.searchService.search(lat, lng, query);
	}
}
