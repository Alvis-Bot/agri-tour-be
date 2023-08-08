import { ApiProperty } from "@nestjs/swagger";

export class CreateProviderDto {
    @ApiProperty()
    readonly id: string;
  
    @ApiProperty()
    readonly name: string;
  
    @ApiProperty()
    readonly address: string;
  
    @ApiProperty()
    readonly phoneNumber: string;
  
    @ApiProperty()
    readonly description: string;
  
    @ApiProperty({ type: [String], required: false })
    readonly images: string[];
}
