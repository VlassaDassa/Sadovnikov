import Error from '../Error';



interface ErrorPageProps {
    error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
    return (
        <Error h1="Error" h2="Something went wrong..." error={error} link="/" />
    );
}