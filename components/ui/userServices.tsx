"use client";
import { findUsername, updateUsername } from "@/components/actions/username";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UserServices = () => {
  const [showServices, setServices] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status, update } = useSession();
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
      setLoading(true);
      const response = await updateUsername(username, session?.user?.email);
      if (response) return await update();
      else {
        throw "error";
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    // @ts-ignore
    if (status === "authenticated" && !session?.user?.username) {
      setServices(true);
    }
  }, []);
  useEffect(() => {
    // @ts-ignore
    if (status === "authenticated" && session?.user?.username) {
      setServices(false);
    }
    // @ts-ignore
  }, [session?.user?.username]);
  return (
    <div
      className={`card w-11/12 bg-background border shadow-xl absolute place-content-center z-10 element ${
        showServices ? "onscreen" : "offscreen"
      }`}
    >
      <div className="card-body">
        <div>
          <h2 className="text-primary">Welcome to Seibu!</h2>
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
            loading={loading}
          >
            <p className="text-background">Submit</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
