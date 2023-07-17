import { ReactNode } from 'react'

export interface IPropsWithClassName {
	className?: string
}

export interface IPropsWithClassNameAndChildren extends IPropsWithClassName {
	children: ReactNode
}

export type ServiceType = 'head-neck-cancer-service' | 'patient-support-group'
