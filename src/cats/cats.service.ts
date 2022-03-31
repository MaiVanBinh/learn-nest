import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/NotFound.exception';
import { Cat } from './interfaces/cat.interface';
@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll():Cat[] {
        return this.cats;
    }
    
    findOne(id): Cat {
        if(this.cats.length > 0) {
            return this.cats[0];
        }
        
        
    }
}
