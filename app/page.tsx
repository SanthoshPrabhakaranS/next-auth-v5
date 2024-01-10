import LoginButton from "@/components/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 items-center justify-center h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <h1 className="text-white text-5xl font-semibold drop-shadow-md">Auth</h1>
      <p className="text-white font-medium">A simple authentication service</p>
      <LoginButton mode="modal" asChild>
        <Button size={"lg"} variant={"secondary"}>
          Sign In
        </Button>
      </LoginButton>
    </main>
  );
}
