import Image from 'next/image';

export default function MenuTitle() {
    return (
        <div className="flex items-center gap-2">
            <Image
                src="/logo-reat-sidebar.png"
                alt="Assam REAT"
                width={44}
                height={44}
            />

            <span className="text-xl font-bold tracking-wide text-primary">
                Assam REAT
            </span>
        </div>
    );
}
