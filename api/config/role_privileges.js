module.exports={
    privGroups:[
        {
            id: "USERS",
            name: "User permission"
        
        },

        {
            id: "ROLES",
            name: "Role permission"
        
        },
        {
            id: "CATEGORIES",
            name: "Category permission"
        
        },
        {
            id: "AUDITLOGS",
            name: "AuditLogs permission"
        
        },
        
        
    ],

    privileges : [
        {
            keys:"user_view",
            name:"User View",
            group:"USERS",
            description:"user view"
        },

        {
            keys:"user_add",
            name:"User add",
            group:"USERS",
            description:"user add"
        },
        {
            keys:"user_update",
            name:"User update",
            group:"USERS",
            description:"user update"
        },
        {
            keys:"user_delete",
            name:"user delete",
            group:"USERS",
            description:"user delete"
        },

        {
            keys:"role_view",
            name:"role View",
            group:"ROLES",
            description:"role view"
        },

        {
            keys:"role_add",
            name:"role add",
            group:"ROLES",
            description:"user add"
        },
        {
            keys:"role_update",
            name:"role update",
            group:"ROLES",
            description:"role update"
        },
        {
            keys:"role_delete",
            name:"role delete",
            group:"ROLES",
            description:"role delete"
        },



        {
            keys:"category_view",
            name:"category View",
            group:"CATEGORIES",
            description:"category view"
        },

        {
            keys:"category_add",
            name:"category add",
            group:"CATEGORIES",
            description:"user add"
        },
        {
            keys:"category_update",
            name:"category update",
            group:"CATEGORIES",
            description:"category update"
        },
        {
            keys:"category_delete",
            name:"category delete",
            group:"CATEGORIES",
            description:"category delete"
        },



        {
            keys:"auditlogs_view",
            name:"auditlogs View",
            group:"AUDITLOGS",
            description:"auditlogs view"
        },

        {
            keys:"auditlogs_add",
            name:"auditlogs add",
            group:"AUDITLOGS",
            description:"user add"
        },
        {
            keys:"auditlogs_update",
            name:"auditlogs update",
            group:"AUDITLOGS",
            description:"auditlogs update"
        },
        {
            keys:"auditlogs_delete",
            name:"auditlogs delete",
            group:"AUDITLOGS",
            description:"auditlogs delete"
        },
    ]

}