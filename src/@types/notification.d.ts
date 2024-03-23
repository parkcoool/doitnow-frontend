declare module "notification" {
  interface Notification {
    id: number;
    text: string;
    link: string;
    type: string;
    read: boolean;
    createdAt: string;
  }
}
