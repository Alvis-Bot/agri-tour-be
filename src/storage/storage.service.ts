import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { ImageType } from "../common/enum";
import { StringUtil } from "../common/utils/string.util";
import * as sharp from "sharp";
import { join } from "path";

@Injectable()
export class StorageService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService
  ) { }

  onModuleInit(): void {
    const path = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  private async uploadStorage(type: ImageType, file: Express.Multer.File): Promise<string> {
    const mimeType = file.mimetype;
    const imageName = await this.buildImageFileName(type, file?.filename || file.filename);
    const imagePath = await this.buildImageFilePath(type, imageName);

    if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
      await sharp(file.buffer).toFile(imagePath);
    } else {
      // Xử lý cho các trường hợp mimetype không rơi vào 'image/jpeg' hoặc 'image/png'
      await sharp(imagePath).toFile(imagePath);
    }

    // Cập nhật đường dẫn dạng /uploads thay vì \\uploads
    return imagePath.replace(/\\?public\\?uploads\\/, '/uploads/');
  }

  async uploadFile(type: ImageType, file: Express.Multer.File): Promise<string> {
    return this.uploadStorage(type, file);
  }

  async uploadMultiFiles(type: ImageType, files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadStorage(type, file)));
  }

  async deleteFile(type: ImageType, fileName: string): Promise<void> {
    const path = await this.buildImageFilePath(type, fileName);
    // Xoá tập tin
    fs.existsSync(path) && fs.unlinkSync(path);
  }

  private async buildImageFileName(type: ImageType, fileName: string): Promise<string> {
    if (fileName) {
      const extension = fileName.split('.').pop();
      return `${type}.${StringUtil.generateRandomString(12)}.${Date.now()}.${extension}`;
    }
    return ''; // Hoặc xử lý khác tùy trường hợp của bạn
  }

  private async buildImageFilePath(type: ImageType, fileName: string): Promise<string> {
    if (type && fileName) {
      const patch = this.configService.get<string>("FOLDER_UPLOAD");
      const path = join('.', patch, type);
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      return join(path, fileName);
    }
    return ''; // Hoặc xử lý khác tùy trường hợp của bạn
  }
}
