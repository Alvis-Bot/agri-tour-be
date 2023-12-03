import {Module} from '@nestjs/common';
import {StatisticsController} from './statistics.controller';
import {StatisticsService} from './statistics.service';
import {FarmModule} from "../farm/farm.module";
import {Area} from "../common/entities/area.entity";
import {AreaModule} from "../area/area.module";
import {LandModule} from "../land/land.module";

@Module({
    imports: [
        FarmModule,
        AreaModule,
        LandModule
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService]
})
export class StatisticsModule {
}
