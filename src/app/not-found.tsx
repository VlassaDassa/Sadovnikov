import Link from 'next/link';



export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>Sorry, but the requested page does not exist.</p>
            <Link href="/" className="back-home">
                Back to home
            </Link>
        </div>
    );
}