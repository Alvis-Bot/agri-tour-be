import { BadRequestException, Logger } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, isDateString } from "class-validator";

export class CreateVisitorDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsInt()
    quantity: number;

    private _receptionDay: string;

    @ApiProperty()
    get receptionDay(): string {
        return this._receptionDay;
    }

    set receptionDay(value: string) {
        const regex = /^(\d{2})-(\d{2})-(\d{4})$/; // Định dạng dd-mm-yyyy
        const match = value.match(regex);

        if (match) {
            const [, day, month, year] = match;

            this._receptionDay = `${day}-${month}-${year}`;
        } else if (value === this._receptionDay) {

            this._receptionDay = value;
        } else {
            throw new BadRequestException("Invalid receptionDay date format. Please use dd-mm-yyyy format");
        }
    }
    @ApiProperty()
    description: string;

    @ApiProperty({
        maximum: 4,
        minimum: 1,
        type: 'integer'
    })
    status: number;
}
