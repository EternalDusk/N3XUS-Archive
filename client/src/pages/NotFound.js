import PageHeader from '../components/PageHeader';

const NotFound = () => (
    <div>
        <PageHeader/>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Go Home</a>
    </div>
);

export default NotFound;