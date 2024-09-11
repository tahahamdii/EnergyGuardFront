import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

// Define a custom type representing your data shape
type EnergyData = {
  date: string;
  details: {
    memoire1: {
      energy: number;
      percent: number;
      cost: number;
    };
    memoire2: {
      energy: number;
      percent: number;
      cost: number;
    };
  };
};

const EnergyPerUsage = () => {
  const [data, setData] = useState<EnergyData[]>([]);

  const staticData: EnergyData[] = [
    { 
      date: "2022-01-01", 
      details: {
        memoire1: {
          energy: 100,
          percent: 30,
          cost: 50
        },
        memoire2: {
          energy: 120,
          percent: 35,
          cost: 60
        }
      }
    },
    // Add more data for different dates as needed
  ];

  useEffect(() => {
    setData(staticData);
  }, []);

  const columns = useMemo<MRT_ColumnDef<EnergyData>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
        size: 200,
      },
      {
        header: 'Memoire 1',
        accessorKey: 'details.memoire1',
        subColumns: [
          {
            header: 'Energy',
            accessorKey: 'energy',
            size: 200,
          },
          {
            header: 'Percent',
            accessorKey: 'percent',
            size: 200,
          },
          {
            header: 'Cost',
            accessorKey: 'cost',
            size: 200,
          },
        ]
      },
      {
        header: 'Memoire 2',
        accessorKey: 'details.memoire2',
        subColumns: [
          {
            header: 'Energy',
            accessorKey: 'energy',
            size: 200,
          },
          {
            header: 'Percent',
            accessorKey: 'percent',
            size: 200,
          },
          {
            header: 'Cost',
            accessorKey: 'cost',
            size: 200,
          },
        ]
      },
    ],
    [] 
  );

  const table = useMaterialReactTable<EnergyData>({ 
    columns,
    data,
    initialState: { showColumnFilters: true },
    enableEditing: true,
    editDisplayMode: 'row',
    onEditingRowSave: ({ table, values }) => {
      table.setEditingRow(null);
    },
    onEditingRowCancel: () => {
    },
  });

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Energy Consumption Per Usage" />
        <MaterialReactTable table={table} />
      </DefaultLayout>
    </>
  );
};

export default EnergyPerUsage;
