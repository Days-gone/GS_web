import DashNav from "@/ui/dashboard/navbar"
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {children}
        </section>
    );
}