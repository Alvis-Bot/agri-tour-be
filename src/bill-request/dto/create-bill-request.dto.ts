import { ApiProperty } from "@nestjs/swagger";

export class CreateBillRequestDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    quantity: number;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    materialId: string; // This will hold the ID of the related Material
  
    @ApiProperty()
    providerId: string; // This will hold the ID of the related PersonEntity
}
