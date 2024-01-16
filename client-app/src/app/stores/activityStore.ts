import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  activityRegistery = new Map<string, Activity>() ;
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate(){
    return Array
            .from(this.activityRegistery.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      // for the mobx async/await mutable operations
      activities.forEach((a: Activity) => {
        this.setActivity(a);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id:string)=>{
    let activity = this.getActivity(id);
    if(activity) 
    {
      this.selectedActivity = activity;
      return activity;
    }
    else {
      this.setLoadingInitial(true);

      try {
        let activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(()=>{
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
        
      }
    }
    
  };

  private setActivity = (activity:Activity)=>{
    activity.date = activity.date.split("T")[0];
    this.activityRegistery.set(activity.id, activity);
  };

  private getActivity = (id:string) => {
    return this.activityRegistery.get(id);
  };

  setLoadingInitial = (loadingInitial: boolean) => {
    this.loadingInitial = loadingInitial;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistery.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  
  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistery.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
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
