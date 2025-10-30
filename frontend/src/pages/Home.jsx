import React from 'react';
import AuthForm from '../components/AuthForm';
// import CreatePostModal from '../components/CreatePostModal';
import Feed from '../components/Feed';

export default function Home({ user, onLogin }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {!user ? (
        <AuthForm onLogin={onLogin} />
      ) : (
        <>
          {/* <CreatePostModal /> */}
          <Feed />
        </>
      )}
    </div>
  );
}
