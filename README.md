## Incridea client repo

### Tech Stack

![Frontend](https://user-images.githubusercontent.com/83623339/217042007-561c14a6-b918-4a03-bd83-96858eee2db8.png)

### Docs

- [**Next JS**](https://nextjs.org/docs/getting-started)
- [**Typescript**](https://www.typescriptlang.org/docs/)
- [**TailwindCSS**](https://tailwindcss.com/docs/installation)
- [**Radix**](https://www.radix-ui.com/docs/primitives/overview/getting-started)
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

> **Note** 
> `index.tsx` includes example for using Apollo client, Framer motion and cva.

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

> **Note**
> Use [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) to keep the commit history clean.
