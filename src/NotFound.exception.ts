import { HttpException, HttpStatus,  } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor() {
      super({
        status: HttpStatus.NOT_FOUND,
        error: 'This is a custom message',
      }, HttpStatus.NOT_FOUND);
    }
  }