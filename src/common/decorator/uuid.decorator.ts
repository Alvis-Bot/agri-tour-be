import { Param, ParseUUIDPipe, Query } from "@nestjs/common";

export const UUIDQuery = (name: string) => Query(name, new ParseUUIDPipe());
export const UUIDParam = (name: string) => Param(name, new ParseUUIDPipe());