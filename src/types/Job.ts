import { JobApplication } from "./applicationApplicants"


export type JobReducer = {
    loading: boolean,
    err: null | any,
    jobs: getAllJobsEntity[],
    job: getAllJobsEntity | null,
    applicant: JobApplication | null
    applicants: JobApplication[]
    applications: JobApplication[]
}


export interface getAllJobsEntity {
    _id?: string,
    job?: {
        _id?: string,
        jobTitle?: string,
        employment?: string,
        description?: string,
        category?: string,
        salaryrange?: { from?: 10000, to?: 1000000 },
        companyId?: string,
        expiry?: Date,
        responsibilities?: [string],
        skills?: [string],
        qualification?: [string],
        createdAt?: Date,
        updatedAt?: Date,
        status?: boolean,
        applicants?: {
            _id?: string,
            companyId?: string,
            jobId?: string,
            deleted?: boolean,
            userId?: string,
            hiring_status?: string,
            resume?: string,
            answers?: [],
            createdAt?: Date,
            hiring_info?: [{
                name?: string,
                notes?: string,
            }],
        },
        company?: {
            _id?: string,
            email?: string,
            name?: string,
            password?: string,
            description?: string,
            locations?: [string],
            industry?: string,
            images?: string,
            benefits?: [],
            foundedDate?: null,
            teams?: [],
            techStack?: [string],
            website?: string,
            employees?: string,
            approvalStatus?: string,
            socialLinks?: [string],
            isBlocked?: boolean,
            createdAt?: Date,
            LinkedInLink?: string,
            profileCompletionStatus?: string
        },
        employmentDetails?: {
            _id?: string,
            name?: string,
            description?: string,
            image?: string,
            status?: false,
            createdAt?: string,
        },
        categoryDetails?: {
            _id?: string,
            name?: string,
            image?: string,
            isDeleted?: boolean,
            createdAt?: Date,
        }
    },
    applicantCount?: number,
    company?: {
        _id?: string,
        email?: string,
        name?: string,
        password?: string,
        description?: string,
        locations?: [string],
        industry?: string,
        images?: string,
        benefits?: [],
        foundedDate?: null,
        teams?: [],
        techStack?: [string],
        website?: string,
        employees?: string,
        approvalStatus?: string,
        socialLinks?: [string],
        isBlocked?: boolean,
        createdAt?: Date,
        LinkedInLink?: string,
        profileCompletionStatus?: string
    },
    jobTitle?: string,
    locations?: [string],
    responsibilities?: [string],
    skills?: [string],
    qualification?: [string],
    expiry?: string,
    salaryrange?: { from?: 10000, to?: 1000000 },
    createdAt?: string,
    employmentDetails?: {
        _id?: string,
        name?: string,
        description?: string,
        image?: string,
        status?: false,
        createdAt?: string,
    },
    categoryDetails?: {
        _id?: string,
        name?: string,
        image?: string,
        isDeleted?: boolean,
        createdAt?: Date,
    }
}


export interface getAllJobsUser {

    _id: string,
    jobTitle: string,
    employment: string,
    description: string,
    category: string,
    salaryrange: { from: 10000, to: 1000000 },
    companyId: string,
    expiry: Date,
    responsibilities: [string],
    skills: [string],
    qualification: [string],
    createdAt: Date,
    updatedAt: Date,
    status: boolean,
    company: {
        _id: string,
        email: string,
        name: string,
        password: string,
        description: string,
        locations: [string],
        industry: string,
        images: string,
        benefits: [],
        foundedDate: null,
        teams: [],
        techStack: [string],
        website: string,
        employees: string,
        approvalStatus: string,
        socialLinks: [string],
        isBlocked: boolean,
        createdAt: Date,
        LinkedInLink: string,
        profileCompletionStatus: string
    },
    employmentDetails: {
        _id: string,
        name: string,
        description: string,
        image: string,
        status: boolean,
        createdAt: Date,
        updatedAt: Date,
    },
    categoryDetails: {
        _id: string,
        name: string,
        image: string,
        isDeleted: boolean,
        createdAt: Date
        updatedAt: Date,
    },
    job:{
        companyId: string
    }
}

export interface Job {
    _id: string,
    jobTitle: string,
    employment: string,
    description: string,
    category: string,
    joblocation: string,
    salaryrange: {
        status: boolean,
        from: number,
        to: number,
    },
    vacancies: { status: boolean, available: number, filled: number },
    companyId?: string,
    expiry: Date,
    experience: number,
    responsibilities: [string],
    completdJobAdd: {
        type: string,
        enum: ["first", "second"],
    },
    skills: [string],
    qualification: [string],
    status: boolean,
    expired: boolean,
    createdAt: string,
    updatedAt: string,
}


export interface IListJob {
    _id: string,
    jobTitle: string,
    employment: {
        name: string,
        description: string,
        image: string,
        status: boolean,
    },
    description: string,
    category: {
        name: string,
        image: string,
        isDeleted: boolean,
    },
    joblocation: string,
    salaryrange: {
        status: boolean,
        from: number,
        to: number,
    },
    vacancies: { status: boolean, available: number, filled: number },
    companyId?: {
        _id: string,
        images: string,
    },
    expiry: Date,
    experience: number,
    responsibilities: [string],
    completdJobAdd: {
        type: string,
        enum: ["first", "second"],
    },
    skills: [string],
    qualification: [string],
    status: boolean,
    expired: boolean,
    createdAt: string,
    updatedAt: string,
}


// [
//     {
//         salaryrange: { from: 10, to: 1000 },
//         _id: new ObjectId('66aa69d36ce6bd6ae692b128'),
//         jobTitle: 'full stack developer',
//         employment: {
//             _id: new ObjectId('66a2750bf4949d519b646991'),
//             name: 'remote jobs',
//             description: 'work from home ',
//             image: 'http://res.cloudinary.com/dghv07eag/image/upload/v1721922827/jobhunty/quuhnc33ze9iufoafhzx.jpg',
//             status: false,
//             createdAt: 2024-07 - 25T15: 53: 47.805Z,
//             updatedAt: 2024-07 - 27T12: 18: 35.393Z,
//             __v: 0
//         },
//         description: 'asdfsdf',
//         category: {
//             _id: new ObjectId('66a4be4a76295cfe93cc8080'),
//             name: 'Technology',
//             image: 'http://res.cloudinary.com/dghv07eag/image/upload/v1722072649/jobhunty/sqrcdjgu6xh2logcpdoz.jpg',
//             isDeleted: false,
//             createdAt: 2024-07 - 27T09: 30: 50.978Z,
//             updatedAt: 2024-07 - 27T09: 30: 50.978Z,
//             __v: 0
//         },
//          companyId: {
//          _id: new ObjectId('66a869027a30190c84a9e336'),
//          email: 'arjun@gmail.com',
//          name: 'arjun',
//          password: '$2b$10$xSM.SXRP2FB3vSsuNWROTOALQLxupnAvEJ/e/yjJKAYkAfAZSi.MS',
//          description: 'hai how are you doing askjweiujn',
//          locations: [Array],
//          industry: 'technology',
//          images: 'http://res.cloudinary.com/dghv07eag/image/upload/v1722314502/jobhunty/knqfodgopfwy9u4wveep.png',
//          benefits: [],
//          foundedDate: null,
//          teams: [],
//          techStack: [Array],
//          website: 'https://www.arjun.com',
//          employees: '1-5',
//          approvalStatus: 'Rejected',
//          socialLinks: [Array],
//          isBlocked: false,
//          createdAt: 2024-07-30T04:16:02.473Z,
//          updatedAt: 2024-07-30T05:15:36.291Z,
//          LinkedInLink: 'https://www.linkedin.com/in/abhinand',
//          profileCompletionStatus: '1%'
//          },
//         expiry: 2024 -08-03T00:00:00.000Z,
//         responsibilities: ['deploying application', ''],
//         skills: ['communication', ''],
//         qualification: ['need a experience of 0 -2 years', ''],
//         __v: 0
//     }
// ]
