import Table from "@/components/Table";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";

export default function Home() {
    useAuth();
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Table page</h1>
                <Table />
            </main>
        </>
    );
}
