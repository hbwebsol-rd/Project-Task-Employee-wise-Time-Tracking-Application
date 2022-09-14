const Excel=require('exceljs')
const moment=require('moment')
const userModel=require('../models/users.model')
const customerModel=require('../models/customer.model')
const projectModel=require('../models/project.model')
const employeeModel=require('../models/employee.model')
const taskModel=require('../models/task.model')

module.exports.getExports=async(req, res)=>{
    // excel sheet on monthly basis
    const startDate=moment(new Date()).startOf('month').toDate()
    const endDate=moment(new Date()).endOf('month').toDate()

    try {
        // infos for excel sheet
        const existingUsers=await userModel.find({created_date: {$gte: startDate, $lte: endDate}})
        const existingcustomers=await customerModel.find({created_date: {$gte: startDate, $lte: endDate}})
        const existingProjects=await projectModel.find({created_date: {$gte: startDate, $lte: endDate}})
        const existingEmployees=await employeeModel.find({created_date: {$gte: startDate, $lte: endDate}})
        const existingTasks=await taskModel.find({created_date: {$gte: startDate, $lte: endDate}})
        // excel sheets
        // admins
        const worklogWorkbook=new Excel.Workbook()
        const adminWorksheet=worklogWorkbook.addWorksheet('Admins')
        adminWorksheet.columns=[
            {header: 'S.no', key: 's_no'},
            {header: 'Name', key: 'name'},
            {header: 'Email', key: 'email'},
            {header: 'Phone Number', key: 'phoneNumber'},
        ]
        // customers
        const customerWorkbook=new Excel.Workbook()
        const customerWorksheet=worklogWorkbook.addWorksheet('Customers')
        customerWorksheet.columns=[
            {header: 'S.no', key: 's_no'},
            {header: 'Name', key: 'name'},
            {header: 'Email', key: 'email'},
        ]
        // projects
        const projectWorkbook=new Excel.Workbook()
        const projectWorksheet=worklogWorkbook.addWorksheet('Projects')
        projectWorksheet.columns=[
            {header: 'S.no', key: 's_no'},
            {header: 'Project Name', key: 'name'},
            {header: 'Customer Name', key: 'customerName'},
            {header: 'Technology Used', key: 'technology'},
            {header: 'Project Start Date', key: 'start'},
            {header: 'Project End Date', key: 'end'},
        ]
        // employees
        const employeeWorkbook=new Excel.Workbook()
        const employeeWorksheet=worklogWorkbook.addWorksheet('Employees')
        employeeWorksheet.columns=[
            {header: 'S.no', key: 's_no'},
            {header: 'Name', key: 'name'},
            {header: 'Email', key: 'email'},
            {header: 'Designation', key: 'designation'},
        ]
        // tasks
        const taskWorkbook=new Excel.Workbook()
        const taskWorksheet=worklogWorkbook.addWorksheet('Tasks')
        taskWorksheet.columns=[
            {header: 'S.no', key: 's_no'},
            {header: 'Task Name', key: 'taskName'},
            {header: 'Project Name', key: 'projectName'},
            {header: 'Employee Name', key: 'employeeName'},
            {header: 'Task Priority', key: 'priority'},
            {header: 'Task Status', key: 'status'},
            {header: 'Total Time', key: 'timeOnTask'},
        ]

        if(createWorkSheet(existingUsers, worklogWorkbook, adminWorksheet))
        if(createWorkSheet(existingcustomers, worklogWorkbook, customerWorksheet))
        if(createWorkSheet(existingProjects, worklogWorkbook, projectWorksheet))
        if(createWorkSheet(existingEmployees, worklogWorkbook, employeeWorksheet))
        if(createWorkSheet(existingTasks, worklogWorkbook, taskWorksheet))
        res.status(200).json({success: true, message: 'Excel Sheet created'})

    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, message: 'Server Error'})
    }

    async function createWorkSheet(info, workbook, worksheet){
        try {
            let count=1
            info.forEach(user=>{
                user.s_no=count
                worksheet.addRow(user)
                count++
            })
    
            for (let i = 0; i < worksheet.columns.length; i++) { 
                let dataMax = 0;
                const column = worksheet.columns[i];
                for (let j = 1; j < column.values.length; j++) {
                  const columnLength = column.values[j].length;
                  if (columnLength > dataMax) {
                    dataMax = columnLength;
                  }
                }
                column.width = dataMax < 10 ? dataMax : dataMax;
            }
    
            worksheet.getRow(1).eachCell(cell=>{
                cell.font={bold: true}
            })
            console.log("excel")
            const data=await workbook.xlsx.writeFile('../Worklog.xlsx')
        } catch (err) {
            console.error(err)
        }
    }
}