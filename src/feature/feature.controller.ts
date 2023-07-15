import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateFeatureDto } from "../common/dto/create-feature.dto";
import { Service } from "../common/enum/service";
import { FeatureService } from "./service/feature.service";
import { IFeatureService } from "./service/feature";
import { ApiTags } from "@nestjs/swagger";
import { Description } from "../common/decorator/description.decorator";

@Controller('feature')
@ApiTags("Feature APIs  (feature)")
export class FeatureController {

  constructor(@Inject(Service.FEATURE_SERVICE) private readonly featureService: IFeatureService) {
  }


  @Post()
  @Description("Tạo chức năng")
  async createFeature(@Body() dto: CreateFeatureDto): Promise<void> {
    await this.featureService.createFeature(dto);
  }

  @Get()
  @Description("Lấy danh sách chức năng")
  async getFeatures() {
    return await this.featureService.getFeatures();
  }
}
