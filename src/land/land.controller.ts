import {Body, Controller, Get, Post, Put, Query, UploadedFiles,} from "@nestjs/common";
import {Router} from "../common/enum/router";
import {LandCreateDto} from "../common/dto/land-create.dto";
import {Land} from "../common/entities/land.entity";
import {ApiTags} from "@nestjs/swagger";
import {Note} from "../common/decorator/description.decorator";
import {QueryAreaIdDto} from "../common/dto/query-area-id.dto";
import {QueryIdDto} from "../common/dto/query-id.dto";
import {LandService} from "./land.service";
import {ApiFiles, ApiMemoryFiles} from "../common/decorator/file.decorator";
import {FileTypes, ImagePath} from "../common/enum";

import {StorageService} from "../storage/storage.service";
import {UUIDQuery} from "../common/decorator/uuid.decorator";
import {MulterUtils, UploadTypesEnum} from "../common/utils/multer.utils";
import {UploadLandDto} from "./dto/upload-land.dto";

@Controller(Router.LAND)
@ApiTags('Land APIs')
export class LandController {
    constructor(
        private readonly landService: LandService,
    ) {}

    @Post('create')
    @ApiMemoryFiles("images", 10, FileTypes.IMAGE)
    async create(
        @UUIDQuery('areaId') areaId: string,
        @Body() dto: LandCreateDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        var locations = null;
        const regex = /\[|\]/;

        if (regex.test(dto.locations.toString())) {
            if (typeof dto.locations === 'string') {
                locations = JSON.parse(dto.locations);
                console.log("postman add");
            } else {
                locations = dto.locations;
                console.log("app and web add");
            }

        } else {
            //   console.log("chạy vào đây location còn lại đây (trường hợp swagger)");
            locations = JSON.parse(`[${dto.locations}]`);
            console.log("swagger add");
        }
        console.log(dto.locations, "log body gửi lên :))");
        return this.landService.createLand(areaId, {
            ...dto,
            locations
        }, files);
    }

    @Get('all')
    @Note('Lấy tất cả vùng trồng')
    async getLands(): Promise<Land[]> {
        return await this.landService.getLands();
    }

    @Put('img')
    @ApiFiles("images", 10, MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_LAND))
    async uploadImage(
        @UUIDQuery('landId') landId: string,
        @Body() dto: UploadLandDto,
        @UploadedFiles() images: Express.Multer.File[]
    ): Promise<any> {
        console.log(dto);
        console.log(images);
        return await this.landService.uploadImage(landId ,dto, images);

        // return await this.storageService.uploadMultiFiles(ImageType.CARD_LAND, files);
    }

    @Get('area')
    @Note('Lấy danh sách vùng trồng theo khu vực')
    async getLandsByAreaId(@Query() {areaId}: QueryAreaIdDto): Promise<Land[]> {
        return this.landService.getLandsByAreaId(areaId);
    }

    @Get('')
    @Note('Lấy thông tin vùng trồng theo landId')
    async getLandById(@Query() {id}: QueryIdDto): Promise<Land> {
        return this.landService.getLandById(id);
    }


}
