import { IPropsWithClassName } from '@/types'
import { ComponentType } from 'react'
import sanitizeHtml from 'sanitize-html'

export interface SanitisedHtmlProps extends IPropsWithClassName {
	html: string
	as?: ComponentType | keyof JSX.IntrinsicElements
}

export const SanitisedHtml = ({
	html,
	className,
	as: Tag = 'div',
}: SanitisedHtmlProps) => {
	const clean = sanitizeHtml(html)
	return (
		<Tag
			className={className}
			dangerouslySetInnerHTML={{ __html: clean }}
		/>
	)
}
