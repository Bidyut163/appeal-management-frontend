import Image from 'next/image';

export default function MenuTitle() {
    return (
        <div className="flex h-12 items-center gap-3">
            <Image
                src="/logo-reat-sidebar.png"
                alt="Assam REAT"
                width={44}
                height={44}
                className="shrink-0 object-contain"
                priority
            />

            <span className="text-xl font-bold tracking-tight text-primary whitespace-nowrap">
                Assam REAT
            </span>
        </div>
    );
}
