import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import useUserData, { User } from './makeData';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import baseUrl from "../../enviroment/enviroment"

const Example = () => {
  const userData = useUserData();
  const [data, setData] = useState<User[]>(userData);

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const handleEditingRowSave = async (updatedRowData: User) => {
    console.log('Updated Row Data:', updatedRowData);
    try {
      const response = await axios.put(`${baseUrl.baseUrl}/auth/editUser/${updatedRowData._id}`, updatedRowData);
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
     
      {
        header: 'Username',
        accessorKey: 'username',
        headerClassName: 'username-header',
        cellClassName: 'username-cell',
        size: 200,
      },
      {
        header: 'Email',
        accessorKey: 'email',
        size: 250,
      },
      {
        header: 'Role',
        accessorKey: 'role',
        size: 150,
        filterVariant:'select',
        editVariant:'select',
        editSelectOptions:['ADMINISTRATOR', 'SUPER ADMINISTRATEUR'],
        filterSelectOptions: ['ADMINISTRATOR', 'SUPER ADMINISTRATEUR'],
      },
      {
        header: 'Verified',
        accessorFn: (originalRow) => (originalRow.isVerified ? 'true' : 'false'),
        id: 'isVerified',
        filterVariant: 'checkbox',
        Cell: ({ cell }) => (
          <button
            style={{
              backgroundColor: cell.getValue() === 'true' ? 'green' : 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
            }}
          >
            {cell.getValue() === 'true' ? 'Verified' : 'Not Verified'}
          </button>
        ),
        size: 170,
      },
      {
        header: 'Approved',
        accessorFn: (originalRow) => (originalRow.isApproved ? 'true' : 'false'),
        id: 'isApproved',
        filterVariant: 'checkbox',
        Cell: ({ cell }) => (
          <button
            style={{
              backgroundColor: cell.getValue() === 'true' ? 'green' : 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
            }}
          >
            {cell.getValue() === 'true' ? 'Approved' : 'Not Approved'}
          </button>
        ),
        size: 170,
      }
      
    ],
    [] 
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    enableEditing:true,
    editDisplayMode:'row',
    onEditingRowSave: ({ table, values }) => {
        handleEditingRowSave(values)
        table.setEditingRow(null); 
      },
    onEditingRowCancel:()=>{

    },
  });

  return (
    <>
    <DefaultLayout>
    <Breadcrumb pageName="User managment" />
    <MaterialReactTable table={table} />
    </DefaultLayout>
    </>
  );
};

export default Example;
