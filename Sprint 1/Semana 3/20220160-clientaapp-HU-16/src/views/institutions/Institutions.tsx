import React from "react";

import {ConvertorCreator} from "../../types/hooks/table";
import {InstitutionFilter} from "../../types/communication/requests/institutions";
import {Institution} from "../../types/communication/responses/institutions";

import {withInstitutionsProvider} from "../../redux/providers/providers";

import InstitutionService from "../../services/InstitutionService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import TableView from "../layouts/TableView";
import InstitutionEditForm from "../../components/institutions/InstitutionEditForm";
import InstitutionActions from "../../components/institutions/InstitutionActions";

const defaultInstitution: Institution = {
    name: '',
    direction: '',
    code: ''
};

const Institutions = () => {
    const convertorCreator: ConvertorCreator<Institution> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.direction}</div>; break;
            case 3: value = <div className="py-4">{rowData.code}</div>; break;
            case 4: value = (
                    <div className="flex justify-end">
                        <InstitutionActions onEdit={() => onEdit(rowData) }
                                            onDelete={() => onDelete(rowData.id as string)} />
                    </div>
                );
                break;
        };

        return value;
    };

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de instituciones"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={InstitutionService}
                       sidePanelId="edit-institution-side-panel"
                       sidePanelEditTitle="Editar instituci??n"
                       sidePanelCreateTitle="Agregar instituci??n"
                       formInputs={InstitutionEditForm}
                       defaultItemSchema={defaultInstitution}
                       addButtonText="Crear instituci??n" />
        </div>
    )
};

const createFilterSchema = (filters: InstitutionFilter, onFiltersUpdate: (x: InstitutionFilter) => any) => ([
    {
        id: "institution-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    },
    {
        id: "institution-address-filter",
        type: Text,
        initialValue: filters.direction,
        onChange: (value: string) => onFiltersUpdate({ ...filters, direction: value }),
        withLabel: true,
        label: 'Direcci??n',
        placeholder: 'Direcci??n',
    },
    {
        id: "institution-code-filter",
        type: Text,
        initialValue: filters.code,
        onChange: (value: string) => onFiltersUpdate({ ...filters, code: value }),
        withLabel: true,
        label: 'C??digo',
        placeholder: 'C??digo',
    }
]);

const columns = ["Nombre", "Direcci??n", "C??digo", ""];

export default withInstitutionsProvider(Institutions);
