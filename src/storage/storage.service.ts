import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { FileTypes } from "../common/enum";
import { StringUtil } from "../common/utils/string.util";
import * as sharp from "sharp";
import { CodeUtil } from "../common/utils/code.util";
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

  private async uploadStorage(type: FileTypes, file: Express.Multer.File): Promise<string> {
    const fileName = this.buildImageFileName(type, file);
    const filePath = await this.buildImageFilePath(fileName);
    await sharp(file.buffer).webp().toFile(filePath);
    return fileName;
  }

  private buildPath(type: FileTypes): string {
    const folderUpload = this.configService.get<string>("UPLOADS_PATH");
    return join(folderUpload, type);
  }

  async uploadFile(type: FileTypes, file: Express.Multer.File): Promise<string> {
    return this.uploadStorage(type, file);
  }

  async uploadMultiFiles(type: FileTypes, files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadStorage(type, file)));
  }

  async deleteFile(fileName: string): Promise<void> {
     const path = await this.buildImageFilePath(fileName);
     // xoá  file
     fs.existsSync(path) && fs.unlinkSync(path);
  }


  private  buildImageFileName(type: FileTypes, file: Express.Multer.File): string {
    // const extension = fileName.split(".").pop();
    const extension = CodeUtil.getMineType(FileTypes.IMAGE).includes(file.mimetype) ? "webp" :  file.filename.split(".").pop();
    const timestamp = Date.now();
    return `${type}.${StringUtil.generateRandomString(12)}.${timestamp}.${extension}`;
  }
  private async buildImageFilePath(fileName: string): Promise<string> {
    const patch = this.configService.get<string>("FOLDER_UPLOAD");
    return join(patch, fileName);
  }






}
