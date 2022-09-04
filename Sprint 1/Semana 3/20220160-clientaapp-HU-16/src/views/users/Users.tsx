import React from "react";

import {ConvertorCreator} from "../../types/hooks/table";
import { User } from "../../types/communication/responses/users";

import {withUsersProvider} from "../../redux/providers/providers";


import Text from "../../components/common/table/filter-renderer/elements/Text";
import TableView from "../layouts/TableView";
import UserService from "../../services/UserService";
import UserEditForm from "../../components/users/UserEditForm";
import { UserFilter } from "../../types/communication/requests/users";
import UserActions from "../../components/users/UserAction";

const defaultUser: User = {
    name: '',
    lastName: '',
    email: '',
    status: false
};

const Users = () => {
    const convertorCreator: ConvertorCreator<User> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.lastName}</div>; break;
            case 3: value = <div className="py-4">{rowData.email}</div>; break;
            case 4: value = <div className="py-4">{rowData.status}</div>; break;
            case 5: value = (
                    <div className="flex justify-end">
                        <UserActions onEdit={() => onEdit(rowData) }
                                            onDelete={() => onDelete(rowData.id as string)} />
                    </div>
                );
                break;
        };

        return value;
    };

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de  Estudiantes"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={UserService}
                       sidePanelId="edit-student-side-panel"
                       sidePanelEditTitle="Editar usuario"
                       sidePanelCreateTitle="Agregar usuario"
                       formInputs={UserEditForm}
                       defaultItemSchema={defaultUser}
                       addButtonText="Crear usuario" />
        </div>
    )
};

const createFilterSchema = (filters: UserFilter, onFiltersUpdate: (x: UserFilter) => any) => ([
    {
        id: "user-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    },
    {
        id: "user-lastName-filter",
        type: Text,
        initialValue: filters.lastName,
        onChange: (value: string) => onFiltersUpdate({ ...filters, lastName: value }),
        withLabel: true,
        label: 'Apellido',
        placeholder: 'Apellido',
    },
    {
        id: "user-email-filter",
        type: Text,
        initialValue: filters.email,
        onChange: (value: string) => onFiltersUpdate({ ...filters, email: value }),
        withLabel: true,
        label: 'Correo',
        placeholder: 'Correo',
    },
    // {
    //     id: "user-status-filter",
    //     type: Boolean,
    //     initialValue: filters.status,
    //     onChange: (value: boolean) => onFiltersUpdate({ ...filters, status: value }),
    //     withLabel: true,
    //     label: 'Estado',
    //     placeholder: 'Estado',
    // }
]);

const columns = ["Nombre", "Dirección", "Código", "Estado", ""];

export default withUsersProvider(Users);
