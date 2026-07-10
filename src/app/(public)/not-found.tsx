import Error from '@/components/shared/Error';



export default function NotFound() {
    return (
        <Error h1="404" h2="Page not found" error="Sorry, but the requested page does not exist." link="/" />
    );
}