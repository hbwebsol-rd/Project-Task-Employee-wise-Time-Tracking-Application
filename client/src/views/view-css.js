import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    main: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '30px',
        flex: 1,
        overflowY: 'auto',
        '@media(max-width: 500px)': {
            marginLeft: '-20px'
        },
    },
    loginMain: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#EBE9F9',
        display: 'flex',
        alignItems: 'center',
    },
    loginRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '25rem !important',
        '@media(max-width: 1450px)': {
            marginLeft: '10rem !important'
        },
        '@media(max-width: 1200px)': {
            margin: '2rem !important'
        },
    },
    loginTextItem: {
        fontSize: '50px !important',
        fontWeight: '600 !important',
        position:'absolute',
        top:'100px',
        left:'30px',
        color: '#ffffff',
        '@media(max-width: 1450px)': {
            fontSize: '40px !important',
        },
    },
    loginTitle:{
        position:'absolute', 
        left:'30px', 
        top:'250px',
        color:'#ffffff', 
        fontSize:'40px !important', 
        fontWeight:'500 !important'
    },

    loginImageBox: {
        width: '500px',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media(max-width: 1450px)': {
            width: '400px'
        },
        '@media(max-width: 980px)': {
            width: '300px'
        },
    },


    headerRoot: {
        width: '95%',
        height: '3rem',
        margin: '0',
        display: 'flex',
        backgroundColor: '#ffffff',
        position: 'fixed',
        padding: '30px',
        zIndex: '1299 !important',
        '@media(max-width: 1400px)': {
            width: '90%'
        },
        '@media(max-width: 968px)': {
            width: '85%'
        },
        '@media(max-width: 728px)': {
            width: '80%',
            height: '1rem'
        },
        '@media(max-width: 500px)': {
            width: '70%'
        },
    },
    logo: {
        fontWeight: '800 !important',
        fontSize: '22px !important',
        color: '#3525B5',
        '@media(max-width: 410px)': {
            fontSize: '18px !important',
        },
    },
    searchBar: {
        height: '40px',
        width: '15rem',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: '#F5F5F5',
        textAlign: 'left'
    },
    headerIcon: {
        fontSize: '35px !important',
        color: '#3525B5',
        position: 'absolute',
        right: '60px',
        top: '5px'
    },
    headerIcons: {
        margin: '15px',
        position: 'absolute',
        right: '4%',
        display: 'flex',
        justifyContent: 'center',

    },
    dropdown: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownList: {
        position: 'absolute',
        top: '40px',
    },
    dropdownListItem: {
        margin: '5px 0',
        textDecoration: 'none',
        color: 'grey',
        borderBottom: '1px solid #D3D3D3'
    },



    sidebarRoot: {
        width: '20rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#3525b5',
        borderRadius: '30px',
        overflowY: 'hidden'
    },

    sidebarIcons: {
        color: '#ffffff',
        margin: '25px 12px !important',
        '@media(max-width: 500px)': {
            marginLeft: '5px !important'
        },
    },
    sidebarListIcon: {
        color: '#3525b5',
        margin: '35px 0 0 35px !important'
    },


    dashboardRoot: {
        marginLeft: '40px !important',
        marginTop: '8rem',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '300px',
        backgroundColor: '#D8FFD1',
        borderRadius: '20px',
        '@media(max-width: 800px)': {
            width: '220px'
        },
        '@media(max-width: 650px)': {
            width: '200px'
        },
    },
    dashboardIcons: {
        fontSize: '60px !important',
        color: '#3525B5',
        marginLeft: '15px',
        '@media(max-width: 800px)': {
            fontSize: '40px !important',
        },
    },
    count: {
        fontWeight: '800 !important',
        fontSize: '40px !important',
        '@media(max-width: 800px)': {
            fontSize: '30px !important',
        },
        '@media(max-width: 650px)': {
            fontSize: '20px !important',
        },
    },
    typo: {
        fontWeight: '800 !important',
        fontSize: '20px !important',
        '@media(max-width: 650px)': {
            fontSize: '15px !important',
        },
    },
    taskBox: {
        margin: '10px !important',
        width: '60rem',
        '@media(max-width: 800px)': {
            width: '40rem'
        },
        '@media(max-width: 610px)': {
            width: '20rem',
            margin: '0px !important',
        },
    },
    taskHead: {
        margin: '40px 0 20px 0 !important',
        fontWeight: '800 !important',
        color: '#3525B5',
    },
    taskTitle: {
        fontWeight: '800 !important',
        fontSize: '16px !important',
        '@media(max-width: 650px)': {
            fontSize: '13px !important',
        },
    },
    taskClient: {
        color: '#767676',
        fontWeight: '600 !important',
        fontSize: '14px !important'
    },
    status: {
        width: '5rem',
        padding: '5px',
        color: '#ffffff',
        borderRadius: '20px',
        fontSize: '12px !important',
        textAlign: 'center'
    },



    pageRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '8rem',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2rem',

    },
    tableHeadContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: '#E6E2FF'
    },
    title: {
        fontWeight: '800 !important',
        fontSize: '22px !important',
        color: '#3525B5'
    },
    addButton: {
        width: '10rem',
        border: '1px solid #3525B5 !important',
        color: '#3525B5 !important'
    },
    tableContainer: {
        width: '95% !important',
        marginTop: '2rem !important',
        '@media(max-width: 1350px)': {
            width: '85% !important',
            overflowX: 'auto !important'
        },
        table: {
            width: '75% !important',
            '@media(max-width: 1350px)': {
                width: '85% !important',
                overflowX: 'auto '
            },
        },
    },
    tableCell: {
        color: '#000000',
        fontWeight: '700 !important',
        fontSize: '16px !important'
    },
    tableButton: {
        '@media(max-width: 900px)': {
            width: '6rem',
        },

    },


    popTask: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20rem'

    },
    popTable: {
        width: '500px !important',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '10px',
        boxShadow: 24,
    },
    popTitleContainer: {
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ''
    },
    popTitle: {
        color: '#3525B5',
        fontWeight: '700 !important',
    },


    formRoot: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    },
    formTitle: {
        margin: '20px !important',
        fontWeight: '700 !important',
        fontSize: '18px !important',
        color: '#3525B5'
    },
    inputField: {
        margin: '20px !important',
        width: '25rem !important'
    },
    formButton: {
        width: '5rem',
        border: '1px solid !important',
        margin: '20px !important'
    },
    inputSelect: {
        width: '12rem !important',
        marginTop: '20px !important',
        marginBottom: '20px !important',
    },


    profileTitle: {
        margin: '30px !important',
        color: '#3525B5',
        fontWeight: '600 !important',
        fontSize: '20px !important',
    },
    profileContainer: {
        marginTop: '8rem',
        width: '70rem !important',
        backgroundColor: '#F3F1FF'
    },
    profileBox: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 30px',
        backgroundColor: '#ffffff',
        height: '3rem',
        borderRadius: '10px'
    },
    profileLabel: {
        marginLeft: '3rem !important',
        width: '25rem',
        fontWeight: '700 !important'
    },
    profileValue: {
        color: '#5C5C5C',
        fontWeight: '400 !important',
    },
    profileTitleBox: {
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '30px'
    },
    editProfileLabel: {
        width: '10rem',
        fontWeight: '700 !important'
    }
})


export { useStyles }