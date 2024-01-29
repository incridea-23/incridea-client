## Incridea client repo

### Tech Stack

![Frontend](https://user-images.githubusercontent.com/83623339/217042007-561c14a6-b918-4a03-bd83-96858eee2db8.png)

### Docs

- [**Next JS**](https://nextjs.org/docs/getting-started)
- [**Typescript**](https://www.typescriptlang.org/docs/)
- [**TailwindCSS**](https://tailwindcss.com/docs/installation)
- [**Headless UI**](https://headlessui.com/)
- [**Apollo Client**](https://www.apollographql.com/docs/react/)
- [**Framer Motion**](https://www.framer.com/motion/)

### Local setup

1. Clone the repository

```bash
git clone https://github.com/incridea-23/incridea-client.git
```

2. Install all dependencies

```bash
npm i
```

3. Run the development server:

```bash
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Apollo client workflow
1. Write a query or mutation under /src/graphql folder. Refer [Playground](https://incridea.onrender.com/graphql) for syntax.
    <details>
      <summary>Query Example</summary>

      ```graphql
      query GetAllUsers {
      users {
        id
        name
        email
      }
      }
      ```

    </details>

    <details>
      <summary>Mutation Example</summary>

      ```graphql
      mutation SignUp($email: String!, $name: String!, $password: String!) {
      signUp(data: { email: $email, name: $name, password: $password }) {
        __typename
        ... on Error {
          message
        }
        ... on MutationSignUpSuccess {
          __typename
        }
      }
    }
      ```

    </details>

2. Run the below command to generate the types for your queries/mutations.
```bash
npm run codegen
```
3. Refer the below examples for queries and mutations.

### Querying example
#### Data fetching options in Next.js

<details>
      <summary>1. CSR</summary>

```typescript
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { GetAllUsersDocument } from '../generated/generated';

const CSR: NextPage = () => {
  const { data, loading, error } = useQuery(GetAllUsersDocument);
  const users = data?.users;

  return (
    <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default CSR;
```
</details>

<details>
      <summary>2. SSG</summary>

```typescript
import { NextPage } from 'next';
import { GetAllUsersDocument } from '../generated/generated';
import { initializeApollo } from '../lib/apollo';

const SSG: NextPage<{
  users: {
    id: string;
    name: string;
  }[];
}> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: GetAllUsersDocument,
  });
  return {
    props: {
      users: res.data.users,
    },
  };
};

export default SSG;
```
</details>
  
<details>
      <summary>3. SSR</summary>
  
Replace `getStaticProps` to `getServerSideProps`.
</details>
  
<details>
      <summary>4. ISR</summary>

Add an invalidate option to SSG.
</details>
  
 <details>
      <summary>5. On-demand ISR</summary>

[Read about it here.](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation)
</details>
  
### Mutation example
<details>
  <summary>Example</summary>
  
  ```typescript
import { SignUpDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';  

signUpMutation({
      variables: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
    })
      .then((res) => {
        if (res.data?.signUp.__typename === 'MutationSignUpSuccess') {
          router.push('/auth/verify-email');
        }
      })
      .catch((err) => {
        return err;
      });
```
</details>
  
> **Note**
> Refer [Sign up mutation for full code.](https://github.com/incridea-23/incridea-client/blob/main/src/pages/auth/signup.tsx) 

### Branching and Making PRs

1. After cloning and setting up the environment, checkout to a new branch (name is related to your task, for eg: feat/user-login, fix/image-overflow)

```bash
git checkout -b ＜branch_name＞
```

2. Make the required changes according to your task.

```bash
//Staging changes
git add .
//Commiting changes
git commit -m <short message about task>
//Pushing changes
git push origin <branch_name>
```

3. Make a Pull request to main branch, and wait for it to get reviewed by someone in the team. If there are review comments, make a new commit making those changes to the same branch to address those comments.
  
> **Development Notes**
> - Please join Incridea org on Trello from the invite link shared on Discord.
> - Use the `HeadComponent` while developing a new page and provide it with suitable title and description for better SEO.
> - Use [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) to keep the commit history clean.
<details>
<summary>Semantic commits</summary>
  
    
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
  
- feat – a new feature is introduced with the changes
- fix – a bug fix has occurred
- chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- refactor – refactored code that neither fixes a bug nor adds a feature
- docs – updates to documentation such as a the README or other markdown files
- style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- test – including new or correcting previous tests
- perf – performance improvements
- ci – continuous integration related
- build – changes that affect the build system or external dependencies
- revert – reverts a previous commit
</details>
