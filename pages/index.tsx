import Link from 'next/link';
import React from 'react';
import { CreateEventForm, Layout } from "../components";

const Main: React.FC = () => {
  return (
    <Layout>
      <>
        <h2 className='mt-3'>Add your participants</h2>
        <CreateEventForm />
      </>
    </Layout>
  )
}

export default Main;
