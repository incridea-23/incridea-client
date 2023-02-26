import React from 'react'

type Props  = React.InputHTMLAttributes<HTMLInputElement> &{
	additionalClasses?: string
}

const TextInput = (props: Props) => {
	return (
		<input
			type={'text'}
			className={`${props.additionalClasses} bg-gray-700 border border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500`}
			{...props}
		/>
	)
}

export default TextInput