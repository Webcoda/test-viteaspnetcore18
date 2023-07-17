import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

interface LoadContainerOpts {
	name: string
	props: any
}

export default async (
	el: HTMLElement,
	$el: JQuery<HTMLElement>,
	opt: LoadContainerOpts,
) => {
	const { default: Component } = await import(
		`../containers/${opt.name}/index.tsx`
	)
	createRoot(el).render(createElement(Component, opt.props))
}
