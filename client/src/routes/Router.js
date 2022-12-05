import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { useStyles } from "../views/view-css";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Employee from "../pages/Employee";
import Tasks from "../pages/Tasks";
import Client from "../pages/Client";
import Profile from "../pages/Profile";
import Reports from "../pages/Reports";
import { useSelector } from "react-redux";
import Footer from "../layout/Footer";
import Timesheet from "../pages/Timesheet";

const Router = () => {
  const login = useSelector((state) => state.login.loggedIn);
  const classes = useStyles();

  return (
    <>
      {login ? (
        <div className={classes.root}>
          <aside style={{ width: "200px" }}>
            <Sidebar />
          </aside>
          <div className={classes.main}>
            <Header />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<Home />} />
              <Route path="/employees" element={<Employee />} />
              <Route path="/clients" element={<Client />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/timesheet" element={<Timesheet />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            <div style={{ flex: 1 }}></div>
            <footer className={classes.footer}>
              <Footer />
            </footer>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/:admin" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default Router;
