import Head from "next/head";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import useRestrict from "@/hooks/useRestrict";
export default function Home() {
    useRestrict("/table");
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
                <h1>Main page</h1>

                <LoginForm />
            </main>
        </>
    );
}
