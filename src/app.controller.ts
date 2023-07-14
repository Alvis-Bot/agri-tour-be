import { BadRequestException, Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@Controller()
export class AppController {
    constructor() { }

    @Get('/')
    @Render('index')
    getHello() {
        return {
            statusCode: 200,
            message: "Hello everyone"
        }

    }
}
