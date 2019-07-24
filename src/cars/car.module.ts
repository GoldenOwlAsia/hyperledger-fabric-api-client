import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { ChainModule } from '../core/chain/chain.module';

@Module({
    controllers: [
        CarController,
    ],
    providers: [
        CarService,
    ],
    imports: [
        ChainModule,
    ]
})
export class CarModule {
}
