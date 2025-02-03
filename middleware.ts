export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/goals/new',
        '/goals/[id]/update'
    ]
}