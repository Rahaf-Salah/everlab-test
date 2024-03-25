import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { RisksTableProps } from "../types";
import TableContainer from "@mui/material/TableContainer";

const RisksTable: FC<RisksTableProps> = ({ rows }) => {
  return (
    <div className="m-auto w-[80%] border mt-4 rounded-xl">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="text-cyan-500">Risk Name</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">Diagnostic</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">Group</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">Value</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">Unit</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">Low Value</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">High Value</span>
              </TableCell>
              <TableCell>
                <span className="text-cyan-500">Conditions</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="w-full">
            {rows?.length === 0 && (
              <TableCell colSpan={8}>
                <div className="text-center">No Data</div>
              </TableCell>
            )}
            {rows?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.diagnostic}</TableCell>
                <TableCell>{row.group}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.low}</TableCell>
                <TableCell>{row.high}</TableCell>
                <TableCell>{row.conditions.join(",")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RisksTable;
