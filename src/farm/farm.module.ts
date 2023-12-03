import {Module} from '@nestjs/common';
import {FarmController} from './farm.controller';
import {FarmService} from './farm.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Farm} from "../common/entities/farm.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Farm])],
    controllers: [FarmController],
    providers: [FarmService],
    exports: [FarmService]
})
export class FarmModule {
}
