import Head from 'next/head';
import FormGroups from "@/app/group-maker/components/GroupForm";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Head>
        <title>Former les Groupes</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="flex justify-center items-center min-h-screen w-full bg-gray-100">
        <FormGroups/>
      </main>
    </div>
  );
};

export default Home;
