export interface InboxData {
  username: string;
  alias: string;
}

export interface InboxResult {
  inbox: {
    email: string;
    alias: string;
  };
  isNewInbox: boolean;
}
