import DataTable from '@/components/common/table'
import { GetUserListService } from '@/services/user.services';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect } from 'react'

const { accessor, display } = createColumnHelper<any>();
const userColumns = [
    accessor('id', { header: 'ID', }),
    accessor('name', { header: 'Name', }),
    accessor('email', { header: 'Email', }),
    accessor('role', { header: 'Role', }),
    accessor('gymName', { header: 'Gym Name', }),
];

const Users = () => {
    const [data, setData] = React.useState<any[]>([]);
    const fetchData = async () => {
        try {
            // const result = await GetUserListService();
            // setData(result.data);

            setData([
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'yDv0W@example.com',
                    role: 'admin',
                    // gymName: 'validTenant',
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'r1CtX@example.com',
                    role: 'customer',
                    gymName: 'validTenant',
                }
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <DataTable
                columns={userColumns}
                data={data}
            />

        </>
    )
}

export default Users