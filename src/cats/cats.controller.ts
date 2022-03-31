import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotFoundException } from 'src/NotFound.exception';
import {CatsService} from './cats.service';
import {CreateCatDto} from './dto/create-cat.dto';
import {Cat} from './interfaces/cat.interface';

@Controller('cats')
export class CatsController{
    constructor(private catsService: CatsService) {}
    
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const cat = this.catsService.findOne(id);
        if(!cat) {

        }
        throw new NotFoundException();
    }
}