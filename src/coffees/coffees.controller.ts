import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorators';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';


@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesServices: CoffeesService) {};

    @UsePipes(ValidationPipe)
    @Public()
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.coffeesServices.findAll(paginationQuery);
    }

    @Get(':id')
    async findByID(@Param('id') id: number) {
        const result = await this.coffeesServices.findByID(id)
        console.log(result);
        if(!result) {
            throw new NotFoundException(`Coffee #${id} is not found`);
        }
        return result;
    }
    
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        const result = this.coffeesServices.create(createCoffeeDto);
        return result;
    }

    @Patch(':id')
    async update(@Param('id') id, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        await this.coffeesServices.update(id, updateCoffeeDto);
        return `Update coffee #${id} Success`;
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        await this.coffeesServices.delete(id);
        return `Delete coffee #${id} Success`
    }
}
