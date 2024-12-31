import DashNav from "@/ui/dashboard/navbar"
import React from "react";

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