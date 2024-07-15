import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
    {
        userName: "midudev",
        children: "Miguel Angel Duran",
        initialIsFollowing: false
    },
    {
        userName: "aleisteragrez",
        children: "Eric Aguirrez",
        initialIsFollowing: true
    },
    {
        userName: "freddier",
        children: "Freddy Vega",
        initialIsFollowing: false
    }
];

export function App() {

  return (
    <section className="App">
    {users.map((user) => (
        <TwitterFollowCard key={user.userName} {...user} />
    ))}


    {/* {
        users.map((user) => {
            const {userName, name, initialIsFollowing} = user
            return (
                <TwitterFollowCard 
                userName={userName} 
                initialIsFollowing={initialIsFollowing}
                >
                    {children}
                </TwitterFollowCard>
            )
        })
    } */}
    </section>
  );
}
