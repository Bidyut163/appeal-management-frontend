import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Cashflow</h1>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Signup</Link>
            </Button>
        </div>
    );
}
