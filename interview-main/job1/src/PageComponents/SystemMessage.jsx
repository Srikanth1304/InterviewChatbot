import React from 'react'

export const SystemMessage = (props) => {
  return (
    <>
        <div className="flex">
                <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                    {props.message}
                </div>
            </div>
    </>
  )
}