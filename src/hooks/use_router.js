// import {
//   useHistory,
//   useLocation,
//   useParams,
//   useRouteMatch,
// } from "react-router";
// import { useMemo } from "react";
// // import * as queryString from "querystring";

// const useRouter = () => {
//   const params = useParams();
//   const location = useLocation();
//   const history = useHistory();
//   const match = useRouteMatch();

//   return useMemo(() => {
//     console.log();

//     return {
//       push: history.push,
//       replace: history.replace,
//       pathname: location.pathname,
//       //   query: {
//       //     ...queryString.parse(location.search),
//       //     ...params,
//       //   },
//       location,
//       history,
//       match,
//     };
//   }, [params, location, history, match]);
// };

// export default useRouter;
