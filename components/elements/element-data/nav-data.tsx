interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export const personalTools = (uuid: string): NavigationItem[] => [
  {
    title: "Dashboard",
    href: "/",
    description: "A central hub that provides an overview of key metrics and activities."
  },
  {
    title: "My Diary",
    href: `/testdiary/${uuid}`,
    description: "A personal diary for managing appointments, events, and reminders."
  },
  {
    title: "Branch Diary",
    href: "/diary",
    description: "A shared diary for managing appointments and tasks specific to the branch."
  },
  {
    title: "My Tasks",
    href: "/tasks",
    description: "A list of tasks assigned to you, helping track your to-dos and deadlines."
  }
];

export const administrativeTools: NavigationItem[] = [
  {
    title: "Address Book",
    href: "/addressbook",
    description: "A directory for managing contacts and important addresses."
  },
  {
    title: "Alerts",
    href: "/alerts",
    description: "A section for notifications and important alerts that require attention."
  },
  {
    title: "Reports",
    href: "/reports",
    description: "A space to view and generate reports on various activities and metrics."
  },
  {
    title: "Finance",
    href: "/finance",
    description: "A section to manage and track financial information, transactions, and reports."
  }
];

export const salesComponents: NavigationItem[] = [
  {
    title: "Sales Properties",
    href: "/sales/residential/properties",
    description: "A list of properties for sale."
  },
  {
    title: "Vendors",
    href: "/sales/residential/vendors",
    description: "A list of vendors who have properties for sale."
  },
  {
    title: "Buyers",
    href: "/sales/residential/buyers",
    description: "A list of buyers who are interested in buying properties."
  },
  {
    title: "Solicitors",
    href: "/sales/solicitors",
    description: "A list of solicitors for the sale of properties."
  }
];

export const lettingsComponents: NavigationItem[] = [
  {
    title: "Properties",
    href: "/lettings/residential/properties",
    description: "A list of properties for letting."
  },
  {
    title: "Landlords",
    href: "/lettings/residential/landlords",
    description: "A list of landlords who have properties for letting."
  },
  {
    title: "Tenants",
    href: "/lettings/residential/tenants",
    description: "A list of tenants who are interested in renting properties."
  },
  {
    title: "Suppliers",
    href: "/lettings/suppliers",
    description: "A list of suppliers who provide services to the letting of properties."
  },
  {
    title: "Lettings",
    href: "/lettings/residential",
    description: "A list of lettings for residential properties."
  }
];

export const marketingComponents: NavigationItem[] = [
  {
    title: "Portals",
    href: "/marketing/portals",
    description: "Select the portal accounts to be included in the export."
  },
  {
    title: "Social Media",
    href: "/marketing/socialmedia",
    description: "Get the social media accounts for the properties."
  },
  {
    title: "Board Management",
    href: "/marketing/boards",
    description: "Board management for the properties."
  }
];

export const adminComponents: NavigationItem[] = [
  {
    title: "Company",
    href: "/company",
    description: "Manage the company details."
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Manage the system settings."
  },
  {
    title: "System Data",
    href: "/systemdata",
    description: "Manage the system data."
  }
];

export const templatesComponents: NavigationItem[] = [
  {
    title: "Letters & Emails",
    href: "/templates/lettersandemails",
    description: "Manage the letters and emails for the system."
  },
  {
    title: "Documents",
    href: "/templates/documents",
    description: "Manage the documents for the system."
  },
  {
    title: "Other",
    href: "/templates/other",
    description: "Manage the other templates for the system."
  },
  {
    title: "Images",
    href: "/templates/images",
    description: "Manage the images for the system."
  },
  {
    title: "Checklists",
    href: "/templates/checklists",
    description: "Manage the checklists for the system."
  }
];