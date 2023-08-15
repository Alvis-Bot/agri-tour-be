import { Body, Controller, Get, Post, Query, UploadedFiles, } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiTags } from "@nestjs/swagger";
import { Note } from "../common/decorator/description.decorator";
import { QueryAreaIdDto } from "../common/dto/query-area-id.dto";
import { QueryIdDto } from "../common/dto/query-id.dto";
import { LandService } from "./land.service";
import { ApiFiles } from "../common/decorator/file.decorator";
import { FileTypes, ImageType } from "../common/enum";
import { FileDto } from "./dto/file.dto";
import { StorageService } from "../storage/storage.service";

@Controller(Router.LAND)
@ApiTags('Land APIs')
export class LandController {
  constructor(private readonly landService: LandService,
    private readonly storageService: StorageService
  ) { }

  @Post('create')
  @ApiFiles("images", 10, FileTypes.IMAGE)
  async create(@Query('areaId') areaId: string, @Body() dto: LandCreateDto, @UploadedFiles() files: Express.Multer.File[]
  ) {
    var locations = null;
    const regex = /\[|\]/;

    if (regex.test(dto.locations.toString())) {
      if (typeof dto.locations === 'string') {
        locations = JSON.parse(dto.locations);
        console.log("postman add");
      }
      else {
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


  // @Post('abc')
  // @ApiFiles("files", 10, FileTypes.IMAGE)
  // async abc( @Body() dto: FileDto, @UploadedFiles() files: Express.Multer.File[]
  // ) {
  //   console.log(dto ,files);
  //   return this.storageService.uploadMultiFiles(ImageType.CARD_FARM, files);
  // }

  @Get('all')
  @Note('Lấy tất cả vùng trồng')
  async getLands(): Promise<Land[]> {
    return await this.landService.getLands();
  }

  @Get('area')
  @Note('Lấy danh sách vùng trồng theo khu vực')
  async getLandsByAreaId(@Query() { areaId }: QueryAreaIdDto): Promise<Land[]> {
    return this.landService.getLandsByAreaId(areaId);
  }

  @Get('')
  @Note('Lấy vùng trồng theo id')
  async getLandById(@Query() { id }: QueryIdDto): Promise<Land> {
    return this.landService.getLandById(id);
  }




}
