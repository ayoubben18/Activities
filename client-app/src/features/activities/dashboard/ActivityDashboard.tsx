import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/Pagination";
import InfiniteScroll from "react-infinite-scroller";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const {
    loadingInitial,
    activityRegistery,
    loadActivities,
    setPagingParams,
    pagination,
  } = activityStore;
  const [loadingNext, setLoadingNext] = useState<boolean>(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    if (activityRegistery.size === 0 || activityRegistery.size === 1)
      loadActivities();
  }, [loadActivities, activityRegistery.size]);

  if (loadingInitial && !loadingNext) {
    return <LoadingComponent />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination.currentPage < pagination.totalPages
          }
          initialLoad={false}
        >
          <ActivityList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
