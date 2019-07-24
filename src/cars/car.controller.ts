import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.model';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { InvokeResult } from '../common/utils/invokeresult.model';

@ApiUseTags('cars')
@Controller('cars')
export class CarController {

    /**
     * Creates an instance of CarController.
     * @memberof CarController
     * @param {CarService} carService
     */
    constructor(private carService: CarService) {
    }

    /**
     * Get all cars
     *
     * @returns {Promise<CarDto[]>}
     * @memberof CarController
     */
    @Get()
    @ApiOperation({title: 'Get all cars'})
    @ApiResponse({
        status: 200,
        description: 'Returns a list of car objects',
        type: CarDto,
        isArray: true
    })
    getAll(): Promise<CarDto[]> {
        return this.carService.getAll();
    }

    /**
     * Get car by id
     *
     * @returns {Promise<CarDto[]>}
     * @memberof CarController
     * @param id
     */
    @Get(':id')
    @ApiOperation({title: 'Get a car by id'})
    @ApiResponse({
        status: 200,
        description: 'Returns a Car object',
        type: CarDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Car does not exist!',
        type: NotFoundException
    })
    getById(@Param('id') id: string): Promise<CarDto> {
        return this.carService.getById(id);
    }

    /**
     * Create new car
     *
     * @param {CarDto} carDto
     * @param req
     * @returns {*}
     * @memberof CarController
     */
    @Post()
    @ApiOperation({title: 'Create new car'})
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    create(@Body() carDto: CarDto, @Req() req): Promise<InvokeResult> {
        // Hacking after remove auth0
        req.auth = { id: 'guest' };

        return this.carService.create(carDto, req.auth);
    }

}
