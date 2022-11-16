import { useRouter } from 'next/router';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/_Layout.module.css';

export interface LayoutProps {
    children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    return (
        <Container className='my-3'>
            <div className={styles['santa-container']}>
                <img
                    onClick={() => router.push('/')}
                    className={styles['santa-logo']}
                    src="https://www.secretsantaorganizer.com/build/images/logo.96d73f2e.png"
                    alt="santa logo"
                />
                {children}
            </div>
        </Container>
    )
}

export default Layout;