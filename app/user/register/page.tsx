"use client";
import { findUsername, updateUsername } from "@/components/actions/username";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export default function UserRegistrationPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const checkUsername = async () => {
      if (username.length >= 8) {
        const bool = await findUsername(username);
        setError(bool);
      }
    };
    checkUsername();
  }, [username]);

  const submitUsername = async () => {
    console.log(session);
    if (
      username.length >= 8 &&
      !error &&
      session &&
      session.user &&
      session.user.email
    ) {
      return await updateUsername(username, session?.user?.email);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-1/2">
      <div>
        <h3 className="text-primary">Welcome to Seibu!</h3>
        <p className="text-secondary">
          We'd love to have a bit more information. Please make a username
          longer than 8 characters
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Make a username"
        />
        {error}
        {error === true && username.length > 0 && (
          <span className="text-red-900">there was an error</span>
        )}
        <Button
          variant="primary"
          type="submit"
          onClick={submitUsername}
          active={username.length >= 8 && !error}
        >
          <p className="text-background">Submit</p>
        </Button>
      </div>
    </div>
  );
}
