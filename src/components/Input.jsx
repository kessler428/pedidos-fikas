import React from 'react'

export const Input = ({
    label,
    type,
    name,
    value,
    onChange
    }) => {

    return (
        <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">{label}</label>
            <input
                className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base focus:outline-none"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )

}