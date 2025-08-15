export interface UpdateProfilePayload {
  displayName?: string;
  photoURL?: string;
}

export interface notTypes {
  id: string;
  title: string;
  message: string;
  type: "session" | "journal" | "affirmation";
  createdAt: Date;
  read: boolean;
}
