import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import prismadb from "@/lib/prismadb";
import NavBar from "@/components/navbar";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {
    const {userId} = auth();

    if (!userId) {
        // the way to redirect to sign in page
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <div>
                <NavBar />
            </div>
            {children}
        </>
    )

}