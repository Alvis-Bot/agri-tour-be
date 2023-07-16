import { IS_UUID, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class QueryFarmIdDto{


    // @IsUUID()    
    @IsNotEmpty()
    @ApiProperty()
    farmId: string;
}