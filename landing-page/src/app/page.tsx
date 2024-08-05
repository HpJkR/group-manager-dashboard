import Head from 'next/head';
import Image from "next/image";
import StudentManager from "@/assets/student-manager.webp";
import AddStudent from "@/assets/add-student.webp";
import EditStudent from "@/assets/edit-student.webp";
import GroupMaker from "@/assets/group-maker.webp";
import React from "react";
import {Divider} from "@mui/material";

const Home: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-gray-100">
      <Head>
        <title>Manage All Your Groups</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="flex flex-col w-full h-full">
        <h1 className="text-4xl font-bold text-center p-6">All Group Management Tools in One Place</h1>
        <Divider/>
        <div className="flex justify-around w-full p-6">
          <h2 className="text-2xl font-semibold text-center">Create Random Groups</h2>
          <Image src={GroupMaker} alt="Group Maker" width={800} height={800} className="rounded-md"/>
        </div>
        <Divider/>
        <div className="flex justify-around w-full p-6">
          <h2 className="text-2xl font-semibold text-center">Manage All Your Students</h2>
          <Image src={StudentManager} alt="Student Manager" width={800} height={800} className="rounded-md"/>
        </div>
        <Divider/>
        <div className="flex justify-around w-full p-6">
          <h2 className="text-2xl font-semibold text-center">Easily Add, Edit, and Delete Students</h2>
          <Image src={AddStudent} alt="Add Student" width={400} height={400} className="rounded-md"/>
          <Image src={EditStudent} alt="Edit Student" width={400} height={400} className="rounded-md"/>
        </div>
        <Divider/>
        <p className="text-2xl font-semibold text-center p-6">Want to try the Group Maker? Go to the Groups section in
          the sidebar.</p>
        <Divider/>
        <p className="text-2xl font-semibold text-center p-6">
          Want to explore all the features? Fork my project <a href="https://github.com/HpJkR/group-manager-dashboard"
                                                               target="_blank"
                                                               rel="noopener noreferrer"
                                                               className="text-blue-500 underline">here</a> and follow
          the steps in the README.
        </p>
      </main>
    </div>
  );
};

export default Home;
