import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Activity } from "../models/activity";

export default class ActivityStore {
  activityRegistery = new Map<string, Activity>() ;
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate(){
    return Array
            .from(this.activityRegistery.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      // for the mobx async/await mutable operations
      activities.forEach((a: Activity) => {
        a.date = a.date.split("T")[0];
        this.activityRegistery.set(a.id, a);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (loadingInitial: boolean) => {
    this.loadingInitial = loadingInitial;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistery.get(id);
  };
  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
  };
  openForm = (id?: string) => {
    if (id) {
      this.selectActivity(id);
    }
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };
  createOrEdit = async (activity: Activity) => {
    this.loading = true;
    try {
      if (activity.id) {
        await agent.Activities.update(activity);
        runInAction(() => {
          this.activityRegistery.set(activity.id,activity);
          this.selectedActivity = activity;
          this.editMode = false;
          this.loading = false;
        });
      } else {
        activity.id = uuid();
        await agent.Activities.create(activity);
        runInAction(() => {
          this.activityRegistery.set(activity.id,activity);
          this.selectedActivity = activity;
          this.editMode = false;
          this.loading = false;
        });
      }
    } catch (error: any) {
      console.log(error.message);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id).then(() => {
        runInAction(() => {
          this.activityRegistery.delete(id);
          if(this.selectedActivity?.id === id) this.cancelSelectActivity();
          this.loading = false;
        });
      });
    } catch (error: any) {
      console.log(error.message);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
