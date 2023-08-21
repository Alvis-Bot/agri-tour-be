import { Module } from '@nestjs/common';
import { BillRequestService } from './bill-request.service';
import { BillRequestController } from './bill-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillRequest } from 'src/common/entities/bill-request.entity';
import { MaterialModule } from 'src/material/material.module';
import { PersonsModule } from 'src/providers/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    BillRequest,
  ]),
    MaterialModule,
    PersonsModule
  ],
  controllers: [BillRequestController],
  providers: [BillRequestService],
  exports: [BillRequestService]
})
export class BillRequestModule { }
