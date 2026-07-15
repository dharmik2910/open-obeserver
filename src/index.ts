import { Elysia } from 'elysia'
import { instrumentation } from './instrumentation'

async function getProfile(id: string) {
	await new Promise((r) => setTimeout(r, 50))
	return { id, name: 'Test User' }
}

new Elysia()
	.use(instrumentation)
	.get('/', () => 'hello world')
	.get('/user/:id', async function getUser({ params }) {
		return getProfile(params.id)
	})
	.listen(3000)

console.log('Elysia running on http://localhost:3000')