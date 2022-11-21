import React from 'react'

export const Checkbox = ({label, value, onChange}) => {
    return (
        <div className="flex flex-row gap-2 mt-4">
            <input
                type="checkbox"
                name="name"
                checked={value}
                onChange={onChange}
            />
            <label className="text-sm lg:text-base">
                {label}
            </label>
          </div>
    )
}