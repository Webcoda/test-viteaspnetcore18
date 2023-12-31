import { useState, MouseEvent } from 'react'

export interface IUsePaginate<T> {
	itemsPerPage: number
	items: T[]
}

export const usePaginate = <T>({ itemsPerPage, items }: IUsePaginate<T>) => {
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0)

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + itemsPerPage
	const currentItems = items.slice(itemOffset, endOffset)
	const pageCount = Math.ceil(items.length / itemsPerPage)

	// Invoke when user click to request another page.
	const handlePageClick = ({ selected }: { selected: number }) => {
		const newOffset = (selected * itemsPerPage) % items.length
		setItemOffset(newOffset)
	}

	return {
		currentItems,
		pageCount,
		handlePageClick,
		setItemOffset,
	}
}
