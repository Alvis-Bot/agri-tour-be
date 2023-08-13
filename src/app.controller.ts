import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('APPLICATION')
export class AppController {
    constructor() { }

    @Get('/')
    @Render('index')
    getHello() {
        return {
            statusCode: 200,
            message: "ĐẶNG VĂN HUY LỎ"
        }
    }
}
