import {Entity} from "./entity";

export interface User extends Entity {
    name: string;
    lastName: string;
    email: string;
    status: boolean;
};
