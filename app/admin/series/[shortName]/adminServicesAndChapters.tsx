"use client";
import { useState } from "react";
import { ChapterButton } from "./chapterbutton";
import { Button } from "@/components/ui/button";
export interface AdminServicesProps {
  chapters: Chapter[] | undefined;
  seriesTitle: string | undefined;
}
export interface Chapter {
  id: string;
  series_id: string;
  chapter: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// with edit i want to be able to reorder the pages...
// and reupload whatever page is missing..

// delete should let me remove the whole chapter

export const AdminServicesAndChapters: React.FC<AdminServicesProps> = ({
  chapters,
  seriesTitle,
}) => {
  const [currentCard, setCurrentCard] = useState<string | undefined>();
  const [action, setAction] = useState<string | undefined>();
  const selectCard = (cardId: string, action: string) => {
    setCurrentCard(cardId);
    setAction(action);
  };
  const finishAction = () => {
    setCurrentCard("");
    setAction("");
  };
  const ActionComponent: React.FC<ActionProps> = ({ action }) => {
    if (action === "edit") return <EditComponent finishAction={finishAction} />;
    else if (action === "delete")
      return <DeleteComponent finishAction={finishAction} />;
  };
  return (
    <>
      <div
        className={`card w-11/12 bg-background border-2 shadow-xl absolute place-content-center z-10 element ${
          currentCard ? "onscreen" : "offscreen"
        } left-0`}
      >
        <div className="card-body bg-primary flex items-center justify-center rounded-xl">
          <ActionComponent action={action} />
        </div>
      </div>
      {chapters &&
        chapters.map((chapter, idx) => {
          return (
            <ChapterButton
              key={idx}
              seriesTitle={seriesTitle}
              chapter={chapter}
              selectCard={selectCard}
            />
          );
        })}
    </>
  );
};

interface ActionProps {
  action: string | undefined;
}

interface CardActionProps {
  finishAction: () => void;
}

export const EditComponent: React.FC<CardActionProps> = ({ finishAction }) => {
  return (
    <div className="border-primary rounded-xl">
      <h3>This is the edit component</h3>
      <Button onClick={finishAction}>OK</Button>
    </div>
  );
};

export const DeleteComponent: React.FC<CardActionProps> = ({
  finishAction,
}) => {
  return (
    <div className="border-primary rounded-xl">
      <h3>This is the delete component</h3>
      <Button onClick={finishAction}>OK</Button>
    </div>
  );
};
