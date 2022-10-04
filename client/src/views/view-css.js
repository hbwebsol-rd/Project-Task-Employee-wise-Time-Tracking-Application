import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    flex: 1,
    overflowY: "auto",
  },

  loginMain: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#EBE9F9",
    display: "flex",
    alignItems: "center",
  },
  loginRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "25rem !important",
    "@media(max-width: 1450px)": {
      marginLeft: "10rem !important",
    },
    "@media(max-width: 1200px)": {
      margin: "2rem !important",
    },
  },
  loginTextItem: {
    fontSize: "50px !important",
    fontWeight: "600 !important",
    color: "#ffffff",
    margin: "30px !important",
    marginTop: "40% !important",
    letterSpacing: "0.25em !important",
    "@media(max-width: 1450px)": {
      fontSize: "40px !important",
    },
  },
  loginTitle: {
    position: "absolute",
    left: "30px",
    top: "250px",
    color: "#ffffff",
    fontSize: "40px !important",
    fontWeight: "500 !important",
  },

  loginImageBox: {
    width: "500px",
    height: "100vh",
    justifyContent: "center",
    "@media(max-width: 1450px)": {
      width: "400px",
    },
    "@media(max-width: 980px)": {
      width: "300px",
    },
  },
  loginInput: {
    "& .MuiFilledInput-root": {
      background: "#ffffff",
    },
  },

  resetTitle: {
    margin: "20px !important",
    fontWeight: "700 !important",
    fontSize: "18px !important",
    color: "#3525B5",
  },

  headerRoot: {
    width: "90%",
    height: "3rem",
    margin: "0 18px",
    display: "flex",
    backgroundColor: "#ffffff",
    position: "fixed",
    padding: "30px 22px",
    borderRadius:"10px",
    zIndex: "1299 !important",
    "@media(max-width: 1765px)": {
      width: "85%",
    },
    "@media(max-width: 1348px)": {
      width: "80%",
    },
    "@media(max-width: 1040px)": {
      width: "75%",
      height: "1rem",
    },
    "@media(max-width: 860px)": {
      width: "70%",
    },
  },
  logo: {
    fontWeight: "800 !important",
    fontSize: "22px !important",
    color: "#3525B5",
    "@media(max-width: 410px)": {
      fontSize: "18px !important",
    },
  },
  headerIcon: {
    fontSize: "42px !important",
    color: "#5B5B5B",
    position: "absolute",
    right: "60px",
    top: "4px",
  },
  headerIcons: {
    margin: "15px",
    position: "absolute",
    right: "4%",
    display: "flex",
    justifyContent: "center",
  },

  sidebarRoot: {
    width: "20rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3525b5",
    overflowY: "hidden",
  },

  sidebarList: {
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
    margin: "15px 12px !important",
    textDecoration: "none",
  },

  sidebarLabel: {
    marginLeft: "10px !important",
    fontSize: "14px !important",
  },

  dashboardRoot: {
    padding: "0 40px",
    marginTop: "8rem",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "110px",
    backgroundColor: "#D8FFD1",
    borderRadius: "20px",
  },
  gridBox: {
    display: "grid !important",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "40px",
    "@media(max-width: 1080px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media(max-width: 767px)": {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  countContainer: {
    width: "5rem",
  },
  dashboardIcons: {
    fontSize: "60px !important",
    color: "#3525B5",
    marginLeft: "15px",
  },
  count: {
    fontWeight: "800 !important",
    fontSize: "35px !important",
  },
  typo: {
    fontWeight: "800 !important",
    fontSize: "16px !important",
  },
  taskBox: {
    margin: "30px 0 !important",
    padding: "5px 0 30px",
    maxWidth: "60rem",
    textTransform: "capitalize",
    backgroundColor: "#F3F1FF",
    borderRadius: "20px",
    boxShadow: "0px 0px 15px #F5F5F5",
  },
  taskHead: {
    margin: "20px 15px !important",
    fontWeight: "800 !important",
    color: "#3525B5",
  },
  taskTitle: {
    fontWeight: "800 !important",
    marginLeft: "15px !important",
    fontSize: "16px !important",
    "@media(max-width: 650px)": {
      fontSize: "13px !important",
    },
  },
  taskClient: {
    color: "#767676",
    marginLeft: "15px !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
  },
  status: {
    width: "6rem",
    padding: "10px",
    color: "#ffffff",
    borderRadius: "20px",
    fontSize: "12px !important",
    textAlign: "center",
  },
  pageRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: "6rem",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem",
    minWidth: "1100px",
  },
  tableHeadContainer: {
    display: "flex",
    height: "70px",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem 0 1rem",
    backgroundColor: "#E6E2FF",
  },
  title: {
    fontWeight: "800 !important",
    fontSize: "22px !important",
    color: "#3525B5",
  },
  addButton: {
    width: "10rem",
    border: "1px solid #3525B5 !important",
    color: "#3525B5 !important",
  },
  tableContainer: {
    width: "95% !important",
    textTransform: "capitalize",
  },
  table: {
    minWidth: "1200px",
  },
  tableHead: {
    backgroundColor: "#F5F3FF",
    height: "70px",
  },
  tableCell: {
    color: "#000000",
    fontWeight: "700 !important",
    fontSize: "16px !important",
  },
  tableButton: {
    "@media(max-width: 900px)": {
      width: "6rem",
    },
  },

  popTask: {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
    width: "650px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
  },
  popTable: {
    width: "600px !important",
    backgroundColor: "white",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
  },
  popTitleContainer: {
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "",
  },
  popTitle: {
    color: "#3525B5",
    fontWeight: "700 !important",
  },

  formRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
    width: "500px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  },
  formTitle: {
    margin: "25px 0 0 50px !important",
    fontWeight: "700 !important",
    fontSize: "18px !important",
    color: "#3525B5",
  },
  inputField: {
    margin: "20px !important",
    width: "25rem !important",
  },
  formButton: {
    width: "11rem !important",
    marginTop: "5px !important",
    marginBottom: "30px !important",
    border: "1px solid !important",
    margin: "20px !important",
  },
  inputSelect: {
    width: "12rem !important",
    marginTop: "20px !important",
    marginBottom: "20px !important",
  },

  profileTitle: {
    margin: "30px !important",
    color: "#3525B5",
    fontWeight: "600 !important",
    fontSize: "20px !important",
  },
  profileContainer: {
    marginTop: "8rem",
    width: "700px !important",
    backgroundColor: "#F3F1FF",
    "@media(max-width: 900px)": {
      width: "calc(100% - 80px) !important",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  profileBox: {
    display: "flex",
    alignItems: "center",
    margin: "20px 30px",
    backgroundColor: "#ffffff",
    height: "3rem",
    borderRadius: "10px",
  },
  profileLabel: {
    marginLeft: "3rem !important",
    width: "20rem",
    fontWeight: "700 !important",
    "@media(max-width: 900px)": {
      width: "calc(100% - 300px) !important",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  profileValue: {
    color: "#5C5C5C",
    fontWeight: "400 !important",
  },
  profileTitleBox: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "30px",
  },
  editProfileLabel: {
    width: "10rem",
    fontWeight: "700 !important",
  },

  tablesheetButtons: {
    marginRight: "30px",
    width: "180px",
    height: "40px",
    color: "#3525B5",
    backgroundColor: "#FFFFFF",
    border: "1px solid #3525B5",
    borderRadius: "30px",
    "&:hover": {
      background: "#F0EEFF",
    },
  },
  activeButton: {
    marginRight: "30px",
    width: "180px",
    height: "40px",
    border: "1px solid #3525B5",
    borderRadius: "30px",
    backgroundColor: "#3525B5",
    color: "#ffffff",
  },

  footer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0",
  },

  version: {
    width: "10rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: "10px",
  },
});

export { useStyles };
