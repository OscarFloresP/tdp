import {useCallback, useEffect, useState} from "react";

import {useAppDispatch} from "../redux/store";
import {useSliceActions, useSliceSelector} from "../redux/providers/SliceProvider";

import useTable from "./useTable";

import {ConvertorCreator, FilterSchemaCreator} from "../types/hooks/table";
import {Service} from "../types/communication/service";

const useTableView = <T, F>(columns: string[] = [], service: Service, defaultItemSchema: T, filterSchemaCreator: FilterSchemaCreator<F>, convertorCreator: ConvertorCreator<T>) => {
    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
    const [item, setItem] = useState<T>(defaultItemSchema);

    const dispatch = useAppDispatch();
    const { dataRequestStarted, dataFetchingFailed, dataLoaded, filtersUpdated, pageUpdated, pageSizeUpdated, dataItemDeleted, dataItemUpdated } = useSliceActions();
    const { items, filters, paginationOptions } = useSliceSelector();

    const getData = async () => {
        if (!filters) return;

        dispatch(dataRequestStarted(null));

        service.getData(filters, paginationOptions?.page, paginationOptions?.pageSize).then(
            (response) => dispatch(dataLoaded(response)),
            (error) => dispatch(dataFetchingFailed(error.message))
        );
    };

    useEffect(() => {
        getData().then();
    }, [filters, paginationOptions]);

    const onSaveItem = () => {
        service.saveItem(item).then(
            () => {
                dispatch(dataItemUpdated(item));
                onEditPanelClose();
            }
        );
    };

    const onEditItem = (item: T) => {
        setIsEditPanelOpen(true);
        setItem(item);
    };

    const onDeleteItem = (id?: string) =>
        id && service.deleteItem(id).then(() => dispatch(dataItemDeleted(id)));

    const onEditPanelClose = () => {
        setIsEditPanelOpen(false);
        setItem(defaultItemSchema);
    };

    const onEditPanelOpen = () => setIsEditPanelOpen(true);

    const onPageUpdate = (page?: number) => dispatch(pageUpdated(page));
    const onPageSizeUpdate = (pageSize?: number) => dispatch(pageSizeUpdated(pageSize));

    const onItemUpdate = (item: T) => setItem(item);

    const filterSchemas = filterSchemaCreator(filters as F, (filters) => dispatch(filtersUpdated(filters)));
    const convertor = useCallback(convertorCreator(onEditItem, onDeleteItem), [convertorCreator]);

    const { tableColumns, tableData } = useTable(convertor, columns, items?.data as T[]);

    return {
        tableColumns,
        tableData,
        filters: filters as F,
        pagination: items?.pagination,
        page: paginationOptions?.page,
        pageSize: paginationOptions?.pageSize,
        filterSchemas,
        onPageUpdate,
        onPageSizeUpdate,
        onSaveItem,
        onEditPanelClose,
        onEditPanelOpen,
        isEditPanelOpen,
        item,
        onItemUpdate
    }
};

export default useTableView;
