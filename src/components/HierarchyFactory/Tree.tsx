import React, { useEffect, useState } from 'react';
import baseUrl from "../../enviroment/enviroment"

interface Usine {
  name: string;
}

interface Machine {
  _id: string;
  name: string;
}

interface Tgbt {
  _id: string;
  nom: string;
  children: {
    machines: Machine[];
    armoires: Armoire[];
  };
}

interface Armoire {
  _id: string;
  name: string;
}

interface Hierarchy {
  usine: Usine;
  children: {
    machines: Machine[];
    tgbts: Tgbt[];
  };
}

const Tree: React.FC<{ usineId: string }> = ({ usineId }) => {
  const [hierarchy, setHierarchy] = useState<Hierarchy | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl.baseUrl}/compteurEnergie/Hierarchy/${usineId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Hierarchy = await response.json();
        setHierarchy(data);
      } catch (error) {
        console.error('Error fetching hierarchy data:', error);
      }
    };
    fetchData();
  }, [usineId]);

  if (!hierarchy) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Usine: {hierarchy.usine.name}</h2>
      <MachinesList machines={hierarchy.children.machines} />
      <TgbtList tgbts={hierarchy.children.tgbts} />
    </div>
  );
};

interface TgbtListProps {
  tgbts: Tgbt[];
}

const TgbtList: React.FC<TgbtListProps> = ({ tgbts }) => {
  return (
    <ul>
      {tgbts.map((tgbt) => (
        <li key={tgbt._id}>
          <TgbtTree tgbt={tgbt} />
        </li>
      ))}
    </ul>
  );
};

interface TgbtTreeProps {
  tgbt: Tgbt;
}

const TgbtTree: React.FC<TgbtTreeProps> = ({ tgbt }) => {
  return (
    <div>
      <h3>TGBT: {tgbt.nom}</h3>
      <MachinesList machines={tgbt.children.machines} />
      <ArmoiresList armoires={tgbt.children.armoires} />
    </div>
  );
};

interface MachinesListProps {
  machines: Machine[];
}

const MachinesList: React.FC<MachinesListProps> = ({ machines }) => {
  return (
    <ul>
      {machines.map((machine) => (
        <li key={machine._id}>{machine.name}</li>
      ))}
    </ul>
  );
};

interface ArmoiresListProps {
  armoires: Armoire[];
}

const ArmoiresList: React.FC<ArmoiresListProps> = ({ armoires }) => {
  return (
    <ul>
      {armoires.map((armoire) => (
        <li key={armoire._id}>{armoire.name}</li>
      ))}
    </ul>
  );
};

export default Tree;
