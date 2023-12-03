


export class FarmMetricsModal{

    readonly totalFarm: number;
    readonly totalArea: number;
    readonly totalLand: number;
    readonly totalStaff: number;


    public loadFormEntity(entity: Partial<FarmMetricsModal>) {
        Object.assign(this, entity);
        return this;
    }

}