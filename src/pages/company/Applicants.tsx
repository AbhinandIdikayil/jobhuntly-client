import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, Backdrop, CircularProgress } from '@mui/material'
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useOutletContext } from 'react-router-dom'
import { listApplicants } from 'src/redux/actions/jobAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { prop } from 'src/types/AllTypes'
import { JobApplication } from 'src/types/applicationApplicants'

function Applicants() {

    const state = useSelector((state: RootState) => state?.job)
    const dispatch: AppDispatch = useDispatch()
    const context = useOutletContext<prop>() || {};
    const { open } = context;

    const columns: ColumnDef<JobApplication>[] = [
        {
            id: 'Logo',
            accessorKey: 'userId?.coverImage',
            header: () => <div>Logo</div>,
            cell: ({ row }) => {
                return <div className='text-left w-16 h-16'>
                    {
                        row?.original?.userId?.coverImage ? (
                            <img className='rounded-full bg-transparent' src={row?.original?.userId?.coverImage} />
                        ) : (
                            <Avatar sx={{width:60,height:60}}> {row.original?.userId?.name?.charAt(0)} </Avatar>
                        )
                    }
                </div>
            }
        },
        {
            id: 'name',
            accessorKey: 'userId?.name',
            header: () => <div>Name</div>,
            cell: ({ row }) => {
                return <div className='text-left capitalize'>
                    {row?.original?.userId?.name}
                </div>
            }
        },
        {
            id: 'status',
            accessorKey: 'hiring_status',
            header: () => <div className="text-left">hiring stage</div>,
            cell: ({ row }) => {
                return <span className={`border border-solid px-2 py-1 rounded-full`}>{row.original.hiring_status}</span>
            }
        },
        {
            id: 'data',
            accessorKey: `createdAt`,
            header: () => <div className="text-left">applied date</div>,
            cell: ({ row }) => {
                const givenDate = new Date(row.original.createdAt);
                const formattedDate = format(givenDate, 'dd-MMM-yy');
                return <div>{formattedDate}</div>
            }
        },
        {
            id: 'role',
            accessorKey: 'jobId.jobTitle',
            header: () => <div>Role</div>,
            cell: ({ row }) => {
                return <div className='text-left capitalize text-ellipsis whitespace-nowrap overflow-hidden'> {row?.original?.jobId?.jobTitle}  </div>
            }
        },
        {
            id: 'mark',
            accessorKey: 'jobId.mark',
            header: () => <div>Mark</div>,
            cell: ({ row }) => {
                return <div className='text-left capitalize'> {row?.original?.mark}  </div>
            }
        },
        {
            id: "actions",
            header: 'Actions',
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <Link to={`/company/applicants/${row.original._id}`}>
                        <Button
                            className='rounded-none hover:bg-white bg-gray-50 font-bold text-indigo-600 border-2 border-indigo-600'>
                            See application
                        </Button>
                    </Link>
                )
            },
        },
    ]


    const table = useReactTable({
        data: state?.applicants || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    useEffect(() => {
        dispatch(listApplicants())
    }, [])


    return (
        <div className={`flex px-4 flex-col ml-1 ${open ? 'w-5/6' : 'w-full'}max-md:ml-0 px-0  py-5 max-md:w-full text-zinc-800 `}>
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Search for applicants."
                        value={(table.getColumn("jobTitle")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("jobTitle")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {

                                table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border" >
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows
                                    // .filter(row => row.original.status === false)
                                    .map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) =>
                                            (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )
                                            )}
                                        </TableRow>
                                    )
                                    )

                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Backdrop
                open={false}
                sx={{ color: 'white', backgroundColor: 'rgba( 9,9,9,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Applicants