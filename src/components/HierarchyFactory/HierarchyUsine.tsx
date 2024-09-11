import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import SearchIcon from '@mui/icons-material/Search';
import baseUrl from "../../enviroment/enviroment"

interface TreeNodeProps {
    name: string;
    children?: TreeNodeData[];
    expandedKeys: number[];
    onToggle: (nodeId: number) => void;
    data: any;
}

interface TreeNodeData {
    nodeId: number;
    parentNodeId?: number;
    name: string;
    children?: TreeNodeData[];
}

const HierarchyUsine: React.FC = () => {
    const [data, setData] = useState<any>();
    const [nomUsine, setNomUsine] = useState<string>('');
    const [listTgbt, setlistTgbt] = useState<any[]>([]);
    const [tgptTree, setTgbtTree] = useState<any[]>([]);
    const [mergedList, setMergedList] = useState<TreeNodeData[]>([]); 
    const [totalEnergyActive, setTotalEnergyActive] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/compteurEnergie/Hierarchy/660eddf84f1ea3fdeb438d33`;
                console.log("this is apiurl :"+apiurl)
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error('Something went wrong');
                } else {
                    const responseData = await response.json();
                    setData(responseData);
                    setNomUsine(responseData.data.usine.nom);
                    setlistTgbt(responseData.data.children.tgbts);
                    setTgbtTree(responseData.data.children.tgbtHierarchies);
                    const mergedList = responseData.data.children.tgbts.map((tgbt: any) => {
                        const correspondingTgbtHierarchy = responseData.data.children.tgbtHierarchies.find((tgbtHierarchy: any) => tgbtHierarchy.nomTgbt === tgbt.nom);
                        if (correspondingTgbtHierarchy) {
                            tgbt.children = correspondingTgbtHierarchy.children;
                        }
                        return tgbt;
                    });
                    setMergedList(mergedList);

                    // Set total energy active
                    setTotalEnergyActive(responseData.data.totalEnergyActive);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        
    }, []);

    const [expandedKeys, setExpandedKeys] = useState<number[]>([]);
    const [filterQuery, setFilterQuery] = useState<string>('');

    const handleToggle = (nodeId: number) => {
        const index = expandedKeys.indexOf(nodeId);
        if (index !== -1) {
            setExpandedKeys(expandedKeys.filter((key) => key !== nodeId));
        } else {
            setExpandedKeys([...expandedKeys, nodeId]);
        }
    };

    const expandAll = () => {
        const allNodeIds = getAllNodeIds(treeData);
        setExpandedKeys(allNodeIds);
    };

    const collapseAll = () => {
        setExpandedKeys([]);
    };

    const getAllNodeIds = (data: TreeNodeData[]): number[] => {
        return data.reduce((acc: number[], node: TreeNodeData) => {
            acc.push(node.nodeId);
            if (node.children) {
                acc = [...acc, ...getAllNodeIds(node.children)];
            }
            return acc;
        }, []);
    };

    const handleFilterQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQuery(event.target.value);
    };

    const treeData: TreeNodeData[] = [];

    if (nomUsine) {
        treeData.push({
            nodeId: 1,
            name: `${nomUsine} - Total Energy Active: ${totalEnergyActive} kW`,
            children: [],
        });
        if (treeData[0]?.children) {
            const numberOfChildren = mergedList.length;
            console.log(mergedList.length);
            for (let i = 0; i < numberOfChildren; i++) {
                const tgbtChildren: TreeNodeData[] = []; 
                treeData[0].children.push({
                    nodeId: i + 5,
                    parentNodeId: 1,
                    name: mergedList[i].nom,
                    children: tgbtChildren
                });
                for (let j = 0; j < mergedList[i].children?.armoires?.length; j++) {
                    const armoireChildren: TreeNodeData[] = [];
                    tgbtChildren.push({
                        nodeId: j + 30+i,
                        parentNodeId: 1,
                        name: mergedList[i].children?.armoires[j].nom,
                        children: armoireChildren
                    });
                    for(let k=0;k<mergedList[i].children?.machines?.length;k++){
                        console.log(mergedList[i].children?.armoires[j]?._id);
                        console.log(mergedList[i].children?.machines?.armoireID);
                        if(mergedList[i].children?.armoires[j]?._id===mergedList[i].children?.machines[k]?.armoireID ){
                            armoireChildren.push({
                                nodeId: k + 60,
                                parentNodeId: 1,
                                name: mergedList[i].children?.machines[k]?.nom,  
                            })
                        }
                    }
                }
            }
        } else {
            console.error('Invalid treeData structure');
        }
    } else {
        console.error('nomUsine is undefined');
    }

    const filteredTreeData = filterTree(treeData, filterQuery);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Plan de Mesurage Electricité" />
            <div className='flex justify-center'>
                <div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{
                            padding: '8px',
                            marginRight: '10px',
                            marginTop: '10px',
                            paddingLeft: '30px',
                            width: '100%',
                        }}>
                            <Button variant="contained" onClick={expandAll} style={{ marginRight: '5px', background: 'teal' }} startIcon={<AddIcon />} className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-4 mb-7 text-white text-[16px] transition hover:bg-opacity-90 flex items-center justify-end">Expand All</Button>
                            <Button variant="contained" onClick={collapseAll} style={{ marginRight: '5px', background: 'blue' }} startIcon={<RemoveIcon />}>Collapse All</Button>
                        </div>
                    </div>
                    {filteredTreeData.map((node: TreeNodeData) => (
                        <TreeNode key={node.nodeId} name={node.name} children={node.children} expandedKeys={expandedKeys} onToggle={handleToggle} data={data} />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

const TreeNode: React.FC<TreeNodeProps> = ({ name, children, expandedKeys, onToggle, data }) => {
    const nodeId = children ? children[0]?.nodeId : 0;
    const expanded = expandedKeys.includes(nodeId);

    const handleToggle = () => {
        if (nodeId) {
            onToggle(nodeId);
        }
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <div onClick={handleToggle} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer',fontSize:'20px',marginTop:'10px' }}>
                {children && (expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
                <span>{name}</span>
            </div>
            {expanded && children && children.map((child: TreeNodeData) => (
                <TreeNode key={child.nodeId} name={child.name} children={child.children} expandedKeys={expandedKeys} onToggle={onToggle} data={data} />
            ))}
        </div>
    );
};

const filterTree = (data: TreeNodeData[], query: string): TreeNodeData[] => {
    if (!query) return data;

    return data.filter(node => {
        const matches = node.name.toLowerCase().includes(query.toLowerCase());
        return matches || (node.children && node.children.some(child => filterTree([child], query).length > 0));
    });
};

export default HierarchyUsine;
