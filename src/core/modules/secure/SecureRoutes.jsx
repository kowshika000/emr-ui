import React, { Suspense } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Registration from "../../../secure/registration/Registration";
import DoctorDashboard from "../../../secure/doctorNurseDashboard/doctorDashboard";
import Privileges from "../../../secure/privileges/Privileges";
import Insurance from "../../../secure/insurance/Insurance";
import Loading from "../../../components/FormFields/Loading";
import AllAppointment from "../../../secure/appointment/AllAppointment";
import Master from "../../../secure/masterSetup/master";
import Landing from "../../../components/other/Landing";

const BillingLandingModule = React.lazy(() =>
  import("emr_billing/BillingLanding")
);
const BillingPageModule = React.lazy(() => import("emr_billing/BillingPage"));
const IPEmrModule = React.lazy(() => import("emr_ip/IpHeaderTab"));
const OtBookingModule = React.lazy(() => import("emr_ip/OtBooking"));
const BedAndWardModule = React.lazy(() =>
  import("emr_bedAndWard/BedAndWardHeaderTab")
);
const WardRoomDetail = React.lazy(() =>
  import("emr_bedAndWard/WardRoomDetail")
);
const DoctorEmrModule = React.lazy(() => import("emr_doctor/DoctorEmr"));
const IPDetails = React.lazy(() => import("emr_doctor/IPDetails"));
const OPDetails = React.lazy(() => import("emr_doctor/OPDetails"));
const NurseModule = React.lazy(() => import("emr_nurse/Dashboard"));
const NursePage = React.lazy(() => import("emr_nurse/Nurse"));
const Labratory = React.lazy(() => import("emr_lab/HeaderTabs"));

const BillingLanding = () => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Loading />}>
      <BillingLandingModule navigate={navigate} />
    </Suspense>
  );
};
const BillingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BillingPageModule />
    </Suspense>
  );
};
const IPEmr = () => {
  return (
    <Suspense fallback={<Loading />}>
      <IPEmrModule />
    </Suspense>
  );
};
const Ot = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OtBookingModule />
    </Suspense>
  );
};
const BedAndWard = () => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Loading />}>
      <BedAndWardModule navigate={navigate} />
    </Suspense>
  );
};
const RoomDetail = () => {
  return (
    <Suspense fallback={<Loading />}>
      <WardRoomDetail />
    </Suspense>
  );
};
const DoctorEmrMdl = () => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Loading />}>
      <DoctorEmrModule navigate={navigate} />
    </Suspense>
  );
};
const IpDetailEmrMdl = () => {
  return (
    <Suspense fallback={<Loading />}>
      <IPDetails />
    </Suspense>
  );
};
const OpDetailEmrMdl = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OPDetails />
    </Suspense>
  );
};

const LabModule = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Labratory />
    </Suspense>
  );
};

const NurseMdl = () => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Loading />}>
      <NurseModule navigate={navigate} />
    </Suspense>
  );
};
const NursePages = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NursePage />
    </Suspense>
  );
};

export const SECURE_ROUTES = [
  {
    path: "/secure",
    exact: true,
    secure: true,
    component: () => <Navigate to="/secure/landing" />,
  },
  {
    path: `/secure/landing`,
    exact: true,
    secure: true,
    component: Landing,
  },
  {
    path: `/secure/appointment`,
    exact: true,
    secure: true,
    component: AllAppointment,
  },
  {
    path: `/secure/registration`,
    exact: true,
    secure: true,
    component: Registration,
  },
  {
    path: `/secure/billing/list`,
    exact: true,
    secure: true,
    component: BillingLanding,
  },
  {
    path: `/secure/billing/details`,
    exact: true,
    secure: true,
    component: BillingPage,
  },
  {
    path: `/secure/ipemr`,
    exact: true,
    secure: true,
    component: IPEmr,
  },
  {
    path: `/secure/ot`,
    exact: true,
    secure: true,
    component: Ot,
  },
  {
    path: `/secure/bedandward`,
    exact: true,
    secure: true,
    component: BedAndWard,
  },
  {
    path: `/secure/bedandward/:name`,
    exact: true,
    secure: true,
    component: RoomDetail,
  },
  {
    path: `/secure/doctorEmr`,
    exact: true,
    secure: true,
    component: DoctorEmrMdl,
  },
  {
    path: `/secure/doctorEmr/ipDetails/:name`,
    exact: true,
    secure: true,
    component: IpDetailEmrMdl,
  },
  {
    path: `/secure/doctorEmr/opDetails/:name`,
    exact: true,
    secure: true,
    component: OpDetailEmrMdl,
  },
  {
    path: `/secure/lab`,
    exact: true,
    secure: true,
    component: LabModule,
  },
  {
    path: `/secure/nurseEmr`,
    exact: true,
    secure: true,
    component: NurseMdl,
  },
  {
    path: `/secure/nurseEmr/:name`,
    exact: true,
    secure: true,
    component: NursePages,
  },
  {
    path: `/secure/privileges`,
    exact: true,
    secure: true,
    component: Privileges,
  },
  {
    path: `/secure/insurance`,
    exact: true,
    secure: true,
    component: Insurance,
  },
  {
    path: "/doctor/dashboard",
    exact: true,
    secure: true,
    component: DoctorDashboard,
  },
  {
    path: "/secure/master",
    exact: true,
    secure: true,
    component: Master,
  },
];
