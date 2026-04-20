import { ClientOnly } from './client';

export function generateStatisParams() {
    return [{ slug: [''] }]
}

export default function Page() {
    return <ClientOnly />
}