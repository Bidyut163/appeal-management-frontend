interface InfoRowProps {
    label: string;
    value: React.ReactNode;
}

export default function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div className="flex py-3 border-b last:border-none">
            <span className="w-50 text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
