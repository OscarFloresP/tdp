import React from "react";

import {FormInputs} from "../../types/components/common/modal";
import { User } from "../../types/communication/responses/users";

const UserEditForm = ({ values, onChange }: FormInputs<User>) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-user-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-user-name"
                       name="edit-user-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-address" className="form-label">
                    <div className="flex justify-between">
                        <small>Apellido</small>
                        <small className="text-overline">{values.lastName.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                          id="edit-user-address"
                          name="edit-user-address"
                          placeholder="Apellido"
                          maxLength={100}
                          value={values.lastName}
                          onChange={(e) => onChange && onChange({ ...values, lastName: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-code" className="form-label">
                    <div className="flex justify-between">
                        <small>Correo</small>
                        <small className="text-overline">{values.email.length || '0'} / 25</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-user-code"
                       name="edit-user-code"
                       placeholder="Correo"
                       maxLength={25}
                       value={values.email}
                       onChange={(e) => onChange && onChange({ ...values, email: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-code" className="form-label">
                    <div className="flex justify-between">
                        <small>Estado</small>
                        <small className="text-overline">{values.status.valueOf()}</small>
                    </div>
                </label>
                <switch className="form-input"
                       id="edit-user-code"
                       name="edit-user-code"
                       />
            </div>
        </>
    );
}

export default UserEditForm;
