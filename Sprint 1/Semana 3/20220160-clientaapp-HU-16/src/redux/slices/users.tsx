import createTableDataSlice from "./tableData";

import {TableDataState} from "../../types/store/states";
import { User } from "../../types/communication/responses/users";
import { UserFilter } from "../../types/communication/requests/users";

const initialState: TableDataState<User, UserFilter> = {
    filters: {
        name: '',
        lastName: '',
        email: '',
        status: false 
    }
};

export const usersSlice = createTableDataSlice<User, UserFilter>({
    name: 'users',
    initialState
});

export default usersSlice.reducer;
