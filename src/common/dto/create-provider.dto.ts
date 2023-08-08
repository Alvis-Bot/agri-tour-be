import { ApiProperty } from "@nestjs/swagger";

export class CreateProviderDto {


    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly debt: number;
    @ApiProperty()
    readonly phoneNumber: string;

    @ApiProperty()
    readonly description: string;

}
