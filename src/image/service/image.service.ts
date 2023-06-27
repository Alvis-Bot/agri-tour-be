import { Injectable } from '@nestjs/common';
import { IImageService } from "./image";

@Injectable()
export class ImageService implements IImageService{}
