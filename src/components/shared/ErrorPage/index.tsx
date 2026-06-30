import Link from 'next/link';



interface ErrorPageProps {
    error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
    return (
        <div className="error-container">
            <h1>Error</h1>
            <h2>Something went wrong...</h2>
            <p>{error}</p>
            <Link href="/" className="back-home">
                Back to home
            </Link>
        </div>
    );
}