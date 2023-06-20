import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export const Description = (description: string) => {
	return applyDecorators(
		SetMetadata("description", description),
		ApiOperation({ summary: description }),
	);
};
