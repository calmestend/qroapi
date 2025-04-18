import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { DirectionsModule } from './directions/directions.module';

@Module({
	imports: [SearchModule, DirectionsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
