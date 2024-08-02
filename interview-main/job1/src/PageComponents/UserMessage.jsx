import React from 'react'

export const UserMessage = (props) => {
  return (
    <>
        <div className="flex justify-end">
            <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                {props.message}
            </div>
        </div>
    </>
  )
}