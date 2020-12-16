import { BaseEntityModel } from 'src/app/shared/base-entity.model';

export class Group extends BaseEntityModel{

    name: string;
    shortDesc: string;
    longDesc: string;
}