import { v4 as uuid } from 'uuid';

import {Service} from "../types/communication/service";
import {Filter} from "../types/communication/requests/filter";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Entity} from "../types/communication/responses/entity";
import { User } from '../types/communication/responses/users';
import { UserFilter } from '../types/communication/requests/users';

class UserService implements Service {
    private users: User[] = [...Array(50)].map((x, index) => ({
        id: uuid(),
        name: 'Name ' + (index + 1),
        lastName: 'LastName ' + (index + 1),
        email: 'Email ' + (index + 1),
        status: false
    }));

    async getData(filters: Filter, page?: number, pageSize?: number): Promise<PaginatedResponse<User>> {
        const userFilter: UserFilter = { ...filters } as UserFilter;

        const filteredData = this.users
            .filter((user) => !userFilter.name || user.name.toLowerCase().includes(userFilter.name.toLowerCase()))
            .filter((user) => !userFilter.lastName || user.lastName.toLowerCase().includes(userFilter.lastName.toLowerCase()))
            .filter((user) => !userFilter.email || user.email.toLowerCase().includes(userFilter.email.toLowerCase()))
            // .filter((user) => !userFilter.status || user.status.valueOf(userFilter.status))

        const startIndex = ((page || 1) - 1) * (pageSize || 10);
        const endIndex = startIndex + (pageSize || 10);

        return {
            data: filteredData.slice(startIndex, endIndex),
            pagination: {
                page: page || 1,
                pageSize: pageSize || 10,
                totalItems: filteredData.length,
                hasNext: (page || 1) < Math.ceil(filteredData.length / (pageSize || 10)),
                hasPrev: (page || 1) > 1,
                lastPage: Math.ceil(filteredData.length / (pageSize || 10))
            }
        }
    }

    async deleteItem(id: string) {
        this.users = this.users.filter(x => x.id !== id);
        return id;
    }

    async saveItem(item: Entity) {
        const CUsers: User = item as User;

        const existingUser = this.users.find(x => x.id === CUsers.id);

        if (!existingUser) {
            const newUser = { ...CUsers, id: uuid() };
            this.users = [...this.users, newUser];

            return newUser.id;
        }
        else {
            this.users = this.users.map(x => {
                if (x.id !== existingUser.id) return x;
                return CUsers;
            });

            return existingUser.id as string;
        }
    }
}

export default new UserService();
