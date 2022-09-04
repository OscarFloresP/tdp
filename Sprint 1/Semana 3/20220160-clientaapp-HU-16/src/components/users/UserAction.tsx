import React from "react";
import { UserActionsProps } from "../../types/components/users/users";

const UserActions = ({ onEdit, onDelete }: UserActionsProps) => (
    <div className="space-x-4">
        <button className="button-secondary w-24" onClick={onEdit}>
            Editar
        </button>
        <button className="button-error w-24" onClick={onDelete} >
            Eliminar
        </button>
    </div>
);

export default UserActions;
