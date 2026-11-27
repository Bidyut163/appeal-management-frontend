import type { AppealDetail } from '@/types/appeal';

interface Props {
    appeal: AppealDetail;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        // <div className="grid grid-cols-1 gap-2 py-4 border-b last:border-none sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-8">
        <div className="grid grid-cols-1 gap-2 py-4 border-b last:border-none sm:grid-cols-[minmax(0,320px)_1fr] sm:gap-8">
            <span className="text-sm leading-relaxed text-muted-foreground">
                {label}
            </span>
            {/* <span className="text-sm font-medium leading-relaxed wrap-break-word">
                {value}
            </span> */}
            <div className="min-w-0 text-sm font-medium leading-relaxed wrap-break-word">
                {value}
            </div>
        </div>
    );
}

function PartyCard({
    title,
    name,
    addressLabel,
    address,
    serviceAddress,
    mobile,
    email,
}: {
    title: string;
    name: string;
    addressLabel: string;
    address: string;
    serviceAddress: string;
    mobile: string;
    email: string;
}) {
    return (
        <div className="rounded-lg border p-5 space-y-4">
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {title}
                </h3>
                <p className="mt-1 text-lg font-semibold">{name}</p>
            </div>

            <div className="space-y-3 text-sm">
                <div>
                    <p className="text-muted-foreground">{addressLabel}</p>
                    <p className="mt-1 font-medium">{address || '—'}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Service Address</p>
                    <p className="mt-1 font-medium">{serviceAddress || '—'}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Mobile Number</p>
                    <p className="mt-1 font-medium">{mobile || '—'}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Email Address</p>
                    <p className="mt-1 font-medium break-all">{email || '—'}</p>
                </div>
            </div>
        </div>
    );
}

export default function AppealDetail({ appeal }: Props) {
    return (
        <>
            {/* Parties */}

            <section className="space-y-4">
                <h2 className="text-lg font-semibold">Parties</h2>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <PartyCard
                        title="Appellant"
                        addressLabel="Residential Address"
                        name={appeal.appellantName}
                        address={appeal.appellantResidentialAddressLine1}
                        serviceAddress={appeal.appellantServiceAddressLine1}
                        mobile={appeal.appellantMobileNumber}
                        email={appeal.appellantEmailAddress}
                    />

                    <PartyCard
                        title="Respondent"
                        addressLabel="Office Address"
                        name={appeal.respondentName}
                        address={appeal.respondentOfficeAddressLine1}
                        serviceAddress={appeal.respondentServiceAddressLine1}
                        mobile={appeal.respondentMobileNumber}
                        email={appeal.respondentEmailAddress}
                    />
                </div>
            </section>

            {/* Appeal Details  */}
            <div className="mt-8 border-t pt-6">
                {/* Project Registration Number */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Jurisdiction of the Appellant Tribunal
                    </h2>

                    <p>
                        The appellant declares that the subject matter of the
                        appeal falls within the jurisdiction of the Appellate
                        Tribunal.
                    </p>

                    <InfoRow
                        label="Project Registration Number: "
                        value={appeal.projectRegistrationNumber}
                    />
                </section>

                {/* Limitation */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Limitation
                    </h2>

                    <InfoRow
                        label="The appellant declares that the appeal is within the
                        limitation specified in subsection (2) of section 44."
                        value={appeal.isFiledWithinLimitation ? 'Yes' : 'No'}
                    />

                    <InfoRow
                        label="If the appeal is filed after the expiry of the limitation period specified under subsection (2) of section 44 specify reasons for delay."
                        value={appeal.delayReason || '—'}
                    />
                </section>

                {/* Facts of case */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Facts of case
                    </h2>
                    <div className="max-w-5xl whitespace-pre-wrap wrap-break-word py-2 leading-7 text-foreground">
                        {appeal.factsOfCase}
                    </div>
                </section>

                {/* Grounds of appeal */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Grounds of Appeal
                    </h2>
                    <div className="max-w-5xl whitespace-pre-wrap wrap-break-word py-2 leading-7 text-foreground">
                        {appeal.groundsOfAppeal}
                    </div>
                </section>

                {/* Relief Sought */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Relief(s) sought
                    </h2>
                    <div className="max-w-5xl whitespace-pre-wrap wrap-break-word py-2 leading-7 text-foreground">
                        {appeal.reliefSought}
                    </div>
                </section>

                {/*  */}
                {/* Interim order */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Interim order, if prayed for
                    </h2>
                    <p className="text-muted-foreground">
                        Pending final decision on the appeal, the appellant
                        seeks issue of the following interim order:
                    </p>

                    <div className="max-w-5xl whitespace-pre-wrap wrap-break-word py-2 leading-7 text-foreground">
                        {appeal.interimReliefRequested || '—'}
                    </div>
                </section>
                {/* Matter pending with other court */}
                <section className="space-y-3 border-b py-5 first:pt-0 last:border-b-0">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                        Matter not pending with any other court, etc.
                    </h2>

                    <InfoRow
                        label="Matter not pending with any other court, etc:"
                        value={appeal.isMatterPendingInCourt ? 'Yes' : 'No'}
                    />
                </section>
            </div>
        </>
    );
}
