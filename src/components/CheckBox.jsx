import React from "react";

const CheckBox = ({ title, state, onChange }) => {
    return (
        <div className="flex gap-3 pb-6">
            <input type="checkbox" checked={state} onChange={onChange} />
            <label htmlFor="">{title}</label>
        </div>
    );
};

export default CheckBox;
