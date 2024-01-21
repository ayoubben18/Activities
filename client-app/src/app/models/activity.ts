import { Profile } from "./Profile";

export interface IActivity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  IsCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attenddees: Profile[];
}

export class Activity implements IActivity {
  constructor(init: ActivityFormValues) {
    this.id = init.id!;
    this.title = init.title;
    this.date = init.date;
    this.description = init.description;
    this.category = init.category;
    this.city = init.city;
    this.venue = init.venue;
    // this.hostUsername = init.hostUsername;
    // this.IsCancelled = init.IsCancelled;
    // this.isGoing = init.isGoing;
    // this.isHost = init.isHost;
    // this.host = new Profile(init.host);
    // this.attenddees = init.attenddees.map((x) => new Profile(x));
  }
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string = "";
  IsCancelled: boolean = false;
  isGoing: boolean = false;
  isHost: boolean = false;
  host?: Profile;
  attenddees: Profile[] = [];
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  date: Date | null = null;
  category: string = "";
  city: string = "";
  venue: string = "";

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.description = activity.description;
      this.date = activity.date;
      this.category = activity.category;
      this.city = activity.city;
      this.venue = activity.venue;
    }
  }
}
