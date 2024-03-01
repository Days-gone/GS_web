import DashNav from "@/ui/dashboard/navbar"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <>
            <DashNav></DashNav>
            <section>
                {children}
            </section>
        </>
    );
}