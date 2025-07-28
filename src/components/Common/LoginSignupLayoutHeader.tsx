import { Avatar } from 'antd';
import React from 'react';

function LoginSignupLayoutHeader(props: { imageUrl?: string; name: string }) {
  const { imageUrl, name } = props;
  return (
    <div className="flex mb-8">
      <p className="text-gray-900 text-3xl font-medium">Welcome, {name}!</p>
      {imageUrl ? (
        <Avatar className="ml-auto" size={40} src={imageUrl} />
      ) : (
        <Avatar className="ml-auto font-semibold" size={40}>
          {name?.charAt(0)?.toUpperCase()}
        </Avatar>
      )}
    </div>
  );
}

export default LoginSignupLayoutHeader;
