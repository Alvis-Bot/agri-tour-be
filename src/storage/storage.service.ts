import {Injectable, OnModuleInit} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as fs from "fs";
import {ImageType} from "../common/enum";
import {StringUtil} from "../common/utils/string.util";
import * as sharp from "sharp";
import {join} from "path";


@Injectable()
export class StorageService implements OnModuleInit  {
  constructor(
    private readonly configService: ConfigService
  ) {
  }

  onModuleInit(): void {
    const path = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
  }

  private async uploadStorage(type: ImageType, file: Express.Multer.File): Promise<string> {
    switch (file.mimetype) {
      case 'image/jpeg':
      case 'image/png':
        // Xử lý cho các loại hình ảnh JPEG và PNG
        const imageName = await this.buildImageFileName(type)
        const imagePath = await this.buildImageFilePath(type ,imageName);
        await sharp(file.buffer).webp().toFile(imagePath);
        return imageName
      default:
        // Xử lý cho các trường hợp mimetype không rơi vào các trường hợp trên
        const fileName = await this.buildOtherFileName(type, file.filename)
        const filePath = await this.buildImageFilePath(type, fileName);
        await sharp(filePath).toFile(filePath)
        break;
    }
  }

  async uploadFile(type: ImageType, file: Express.Multer.File): Promise<string> {
    return this.uploadStorage(type, file);
  }

  async uploadMultiFiles(type: ImageType, files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadStorage(type, file)));
  }

  async deleteFile(type: ImageType, fileName: string): Promise<void> {
     const path = await this.buildImageFilePath(type, fileName);
     // xoá  file
     fs.existsSync(path) && fs.unlinkSync(path);
  }


  private async buildImageFileName(type: ImageType): Promise<string> {
    return `${type}.${StringUtil.generateRandomString(12)}.${Date.now()}.webp`;
  }

  private async buildOtherFileName(type: ImageType, fileName: string) {
    const extension = fileName.split('.').pop();
    return `${type}.${StringUtil.generateRandomString(12)}.${Date.now()}.${extension}`;

  }
  private async buildImageFilePath(type : ImageType, fileName: string): Promise<string> {
    const patch = this.configService.get<string>("FOLDER_UPLOAD");
    return join(patch, type, fileName);
  }






}