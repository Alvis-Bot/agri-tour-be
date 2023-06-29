import { Body, Controller, Get, Inject, Patch, Post, Query, UploadedFiles, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ILandService } from "./service/land";
import { Service } from "../common/enum/service";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Description } from "../common/decorator/description.decorator";
import { IAreaService } from "../area/service/area";
import { QueryAreaIdDto } from "../common/dto/query-area-id.dto";
import { QueryIdDto } from "../common/dto/query-id.dto";
import { ApiFiles } from "../area/api-file.decorator";
import { diskStorage } from "multer";
import { extname } from "path";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { UploadDto } from "../area/dto/upload.dto";
import { QueryLandIdDto } from "./dto/query-land-id.dto";
import { UploadLandDto } from "./dto/upload-land.dto";

@Controller(Router.LAND)
@ApiTags('Land APIs')
@UseGuards(JwtAuthGuard)
export class LandController {
  constructor(@Inject(Service.LAND_SERVICE) private readonly landService: ILandService,
              @Inject(Service.AREA_SERVICE) private readonly areaService: IAreaService) {
  }

  @Post()
  @Description('Tạo vùng trồng')
  async createLand(
    @Query() { areaId }: QueryAreaIdDto,
    @Body() dto: LandCreateDto): Promise<Land> {
    const area = await this.areaService.getAreaById(areaId)
    return this.landService.createLand(dto , area);
  }

  @Get('all')
  @Description('Lấy tất cả vùng trồng')
  async getLands(): Promise<Land[]> {
    return this.landService.getLands();
  }

  @Get('area')
  @Description('Lấy danh sách vùng trồng theo khu vực')
  async getLandsByAreaId(@Query() { areaId }: QueryAreaIdDto): Promise<Land[]> {
    return this.landService.getLandsByAreaId(areaId);
  }

  @Get('')
  @Description('Lấy vùng trồng theo id')
  async getLandById(@Query() { id }: QueryIdDto): Promise<Land> {
    return this.landService.getLandById(id);
  }

  @Patch('image')
  @Description("Upload file")
  @ApiFiles('images', true, 20, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
      console.log(file);
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new ApiException(ErrorCode.FILE_TYPE_NOT_MATCHING), false);
      }
    },
  })
  async uploadFile( @Query() { landId }: QueryLandIdDto,
                    @Body() dto: UploadLandDto,
                    @UploadedFiles() files: Express.Multer.File[],){
    return this.landService.uploadFile(landId, dto, files);
  }

}
