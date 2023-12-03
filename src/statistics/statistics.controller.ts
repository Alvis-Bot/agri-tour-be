import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {StatisticsService} from "./statistics.service";
import {Note} from "../common/decorator/description.decorator";

@Controller('statistics')
@ApiTags('APIs Thống kê')
export class StatisticsController {

    constructor(
        private readonly statisticsService : StatisticsService
    ) {
    }

    @Get('farm-metrics')
    @Note('Thống kê số lượng trang trại, số lượng khu , số lượng vùng và nhân viên')
    async getFarmMetrics() {
        return await this.statisticsService.getFarmMetrics();
    }



}
