// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as conditioner from 'conditioner-core'
import JSON5 from 'json5'

export const addInitialPlugins = () => {
	conditioner.addPlugin({
		// converts module aliases to paths
		moduleSetName: (name: string) => `${name}`,

		// use default exports as constructor
		moduleGetConstructor: (module: any) => module.default,

		moduleImport: (name: string) =>
			import(
				/* webpackPreload:true */
				/* webpackChunkName: "[request]" */
				`../modules/${name}.ts`
			),

		moduleSetConstructorArguments: (name: string, el: HTMLElement) => {
			const $el = $(el)
			let opts = {}
			try {
				if ($el.attr('data-module-options')) {
					opts = {
						...opts,
						...JSON5.parse($el.attr('data-module-options') || '{}'),
						...$el.data('moduleOptionsHidden'),
					}
				}
				return [el, $el, opts]
			} catch (err) {
				console.error(err)
				return [el, $el, opts]
			}
		},

		// the plugin "monitor" hook
		monitor: {
			// the name of our monitor, not prefixed with "@"
			name: 'visible',

			// the monitor factory method, this will create our monitor
			create: (context: boolean, element: HTMLElement) => ({
				// current match state
				matches: false,

				// called by conditioner to start listening for changes
				addListener(change: any) {
					new IntersectionObserver((entries) => {
						// update the matches state
						this.matches = entries?.pop()?.isIntersecting == context

						// inform conditioner of the new state
						change()
					}).observe(element)
				},
			}),
		},
	})
	conditioner.addPlugin({
		monitor: {
			name: 'on',
			create: (context: any, el: HTMLElement) => {
				return {
					matches: false,
					addListener(change: any) {
						context.split(',').forEach((evType: string) => {
							el.addEventListener(evType, () => {
								this.matches = true
								change()
							})
						})
					},
				}
			},
		},
	})
}

/**
 * hydrate `el` element that contains the elements with [data-module]
 * @param {DOMElement} el element that contains the elements with [data-module] (not the [data-module] element itself)
 */
export const hydrate = (el: HTMLElement) => {
	conditioner.hydrate(el)
}

/**
 * add initial plugins and hydrate `el` element that contains the elements with [data-module]
 * @param {DOMElement} el element that contains the elements with [data-module] (not the [data-module] element itself)
 */
export const addInitialPluginsAndHydrate = (el: HTMLElement) => {
	addInitialPlugins()
	hydrate(el)
}
