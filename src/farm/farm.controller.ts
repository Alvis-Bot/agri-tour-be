import { BadRequestException, Body, Controller, Get, Inject, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { IFarmService } from "./service/farm";
import { Description } from "../common/decorator/description.decorator";
import { FarmCreateDto } from "../common/dto/farm-create.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/public.meta";
import { QueryAllDto } from "./dto/query-all.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
@Controller(Router.FARM)
@UseGuards(JwtAuthGuard)
@ApiTags('Farm APIs')
export class FarmController {
  constructor(@Inject(Service.FARM_SERVICE) private readonly farmService: IFarmService) {
  }

  @Post('upload')

  @ApiConsumes('multipart/form-data','application/json')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //       },

  //     },
  //   },
  // })

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/uploads/farms',
      filename: (req, file, callback) => {
        const uid = req.query.uid;

        let name = `${uid}-unknown`;
        if (file.originalname && typeof file.originalname === 'string') {
          name = `${uid}-${path.parse(file.originalname).name}`;
        }
        const extension = path.parse(file.originalname || '').ext;
        const filePath = path.join(`public/uploads/farms`, `${name}${extension}`);
        if (fs.existsSync(filePath)) {
          console.log("file already exists! deleting...")
          fs.unlinkSync(filePath);
          console.log("Deleted!");
        }

        console.log("Uploading...");
        callback(null, `${name}${extension}`);

      },
    }),
  }))

  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createfarmDto: FarmCreateDto): Promise<string | any> {
    try {

      const filePath = `uploads/farms/${file.filename}`;
      return { message: 'File uploaded successfully', file: filePath };
    } catch (error) {
      throw new BadRequestException(error.message, error)
    }
  }
  @Post()
  @Description("Tạo mới một trang trại")
  async createFarm(@AuthUser() user: User, @Body() dto: FarmCreateDto) {
    return this.farmService.createFarm(dto, user);
  }

  @Get()
  @Description("Lấy thông tin trang trại theo id")
  async getFarmById(@Query('id') id: string) {
    return this.farmService.getFarmById(id);
  }


  @Get('area-land')
  @Description("Lấy toàn bộ thông tin nông trại")
  async getFarmFetchLandAndArea(@Query() dto: QueryAllDto) {
    return this.farmService.getFarmFetchLandAndArea(dto)
  }


  @Get('all')
  @Description("Lấy danh sách trang trại")
  async getFarms() {
    return this.farmService.getFarms();
  }


}
