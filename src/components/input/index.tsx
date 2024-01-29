import React from 'react'

type Props  = React.InputHTMLAttributes<HTMLInputElement> &{
	additionalclasses?: string
}

const TextInput = (props: Props) => {
	return (
		<input
			type={'text'}
			className={`${props.additionalclasses} bg-gray-600  border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500`}
			{...props}
		/>
	)
}

export default TextInput