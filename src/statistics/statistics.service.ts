import {Injectable} from '@nestjs/common';
import {FarmService} from "../farm/farm.service";
import {AreaService} from "../area/area.service";
import {LandService} from "../land/land.service";
import {FarmMetricsModal} from "./modal/farm-metrics.modal";

@Injectable()
export class StatisticsService {

    constructor(
        private readonly farmService: FarmService,
        private readonly areaService: AreaService,
        private readonly landService: LandService
    ) {
    }


    async getFarmMetrics() {
        const totalFarm = await this.farmService.getTotalFarm()
        const totalArea = await this.areaService.getTotalArea()
        const totalLand = await this.landService.getTotalLand()
        // tổng nhân viên
        const totalStaff = 0

        return new FarmMetricsModal().loadFormEntity({
            totalFarm,
            totalArea,
            totalLand,
            totalStaff
        })


    }


}
