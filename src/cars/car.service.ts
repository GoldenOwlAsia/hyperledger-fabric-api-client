import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CarDto } from './car.model';
import { RequestHelper } from '../core/chain/requesthelper';
import { InvokeResult } from '../common/utils/invokeresult.model';
import { ChainMethod } from '../chainmethods.enum';

@Injectable()
export class CarService {
    /**
     * Creates an instance of CarService.
     * @param {RequestHelper} requestHelper
     * @memberof CarService
     */
    constructor(private requestHelper: RequestHelper) {
    }

    /**
     * Get all cars
     *
     * @returns {Promise<CarDto[]>}
     * @memberof CarService
     */
    getAll(): Promise<CarDto[]> {
        let chainMethod: ChainMethod = ChainMethod.queryAllCars;

        return this.requestHelper.queryRequest(chainMethod).catch((error) => {
            throw new InternalServerErrorException(error);
        });
    }

    /**
     * Get car by id
     *
     * @returns {Promise<CarDto>}
     * @memberof CarService
     */
    getById(id: string): Promise<CarDto> {
        let chainMethod: ChainMethod = ChainMethod.queryCar;
        let chainArgs: Array<any> = [id];

        return this.requestHelper.queryRequest(chainMethod, chainArgs).then(
            (car) => {
                if (!car) {
                    throw new NotFoundException('Car does not exist!');
                }
                return car;
            },
            (error) => {
                throw new InternalServerErrorException(error);
            },
        );
    }

    /**
     * Create new car
     *
     * @param {CarDto} carDto
     * @param {any} authUser
     * @returns {Promise<InvokeResult>}
     * @memberof CarService
     */
    create(carDto: CarDto, authUser: any): Promise<InvokeResult> {
        let chainMethod: ChainMethod = ChainMethod.createCar;
        let chainArgs: Array<any> = [carDto.key, carDto.make, carDto.model, carDto.color, carDto.owner];

        return this.requestHelper.invokeRequest(chainMethod, chainArgs, authUser.id, false)
            .catch((error) => {
                throw new InternalServerErrorException(error);
            });
    }
}
