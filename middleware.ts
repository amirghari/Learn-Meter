export { default } from 'next-auth/middleware'

const config = {
    matcher: [
        '/goals/new',
        '/goals/[id]/update'
    ]
}