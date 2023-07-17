import react from '@vitejs/plugin-react'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

import appsettingsDev from '../UmbracoCMS/appsettings.Development.json'

// Get base folder for certificates.
const baseFolder =
	process.env.APPDATA !== undefined && process.env.APPDATA !== ''
		? `${process.env.APPDATA}/ASP.NET/https`
		: `${process.env.HOME}/.aspnet/https`

// Generate the certificate name using the NPM package name
const certificateName = process.env.npm_package_name

// Define certificate filepath
const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
// Define key filepath
const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

export default defineConfig(async ({ command, mode }) => {
	// Ensure the certificate and key exist
	if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
		// Wait for the certificate to be generated
		await new Promise<void>((resolve) => {
			spawn('dotnet', [
				'dev-certs',
				'https',
				'--export-path',
				certFilePath,
				'--format',
				'Pem',
				'--no-password',
			], { stdio: 'inherit', })
				.on('exit', (code) => {
					resolve()
					if (code) {
						process.exit(code)
					}
				})
		})
	}

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		build: {
			outDir: '../UmbracoCMS/dist',
			emptyOutDir: true,
			manifest: true,
			rollupOptions: {
				input: [
					'./src/main.ts',
					'./src/scss/main.scss',
				]

			},
			sourcemap: true,
		},
		server: {
			port: appsettingsDev.Vite.Server.Port,
			strictPort: true,
			https: {
				cert: certFilePath,
				key: keyFilePath
			},
			hmr: {
				clientPort: appsettingsDev.Vite.Server.Port
			}
		},
		optimizeDeps: {
			include: []
		}
	}
})
