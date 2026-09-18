import type { AppealDetail } from '@/types/appeal';

interface Props {
    appeal: AppealDetail;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex gap-8 py-3 border-b last:border-none">
            <span className="w-50 text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

export default function AppealDetail({ appeal }: Props) {
    return (
        <>
            {/* Parties */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Parties
                </h2>

                <InfoRow label="Appellant Name" value={appeal.appellantName} />
                <InfoRow
                    label="Respondent Name"
                    value={appeal.respondentName}
                />
            </section>

            {/* Appellant Address */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Appellant Address
                </h2>

                <InfoRow
                    label="Appellant Residential Address:"
                    value={appeal.appellantResidentialAddressLine1}
                />
                <InfoRow
                    label="Appellant Service Address:"
                    value={appeal.appellantServiceAddressLine1}
                />
            </section>

            {/* Appellant Contact */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Appellant Contact
                </h2>

                <InfoRow
                    label="Mobile Number:"
                    value={appeal.appellantMobileNumber}
                />
                <InfoRow
                    label="Email Address:"
                    value={appeal.appellantEmailAddress}
                />
            </section>

            {/* Respondent Address */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Respondent Address
                </h2>

                <InfoRow
                    label="Respondent Office Address:"
                    value={appeal.respondentOfficeAddressLine1}
                />

                <InfoRow
                    label="Respondent Service Address:"
                    value={appeal.respondentServiceAddressLine1}
                />
            </section>

            {/* Respondent Contact */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Respondent Contact
                </h2>

                <InfoRow
                    label="Mobile Number:"
                    value={appeal.respondentMobileNumber}
                />
                <InfoRow
                    label="Email Address:"
                    value={appeal.respondentEmailAddress}
                />
            </section>

            {/* Appeal Details  */}

            {/* Project Registration Number */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Jurisdiction of the Appellant Tribunal
                </h2>

                <p>
                    The appellant declares that the subject matter of the appeal
                    falls within the jurisdiction of the Appellate Tribunal.
                </p>

                <InfoRow
                    label="Project Registration Number: "
                    value={appeal.projectRegistrationNumber}
                />
            </section>

            {/* Limitation */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
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
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Facts of case
                </h2>
                <div className="py-2">{appeal.factsOfCase}</div>
            </section>

            {/* Grounds of appeal */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Grounds of Appeal
                </h2>
                <div className="py-2">{appeal.groundsOfAppeal}</div>
            </section>

            {/* Relief Sought */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Relief(s) sought
                </h2>
                <div className="py-2">{appeal.reliefSought}</div>
            </section>

            {/*  */}
            {/* Interim order */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Interim order, if prayed for
                </h2>

                <InfoRow
                    label="Pending final decision on the appeal, the appellant seeks issue of the following
                                interim order:"
                    value={appeal.interimReliefRequested || '—'}
                />
            </section>
            {/* Matter pending with other court */}
            <section className="space-y-2 border-b pb-4 last:border-none">
                <h2 className="text-base font-semibold text-muted-foreground">
                    Matter not pending with any other court, etc.
                </h2>

                <InfoRow
                    label="Matter not pending with any other court, etc:"
                    value={appeal.isMatterPendingInCourt ? 'Yes' : 'No'}
                />
            </section>
        </>
    );
}
