import React from "react";
import styles from "./DataTable.module.css";
import { useForm } from "../Contexts/FormContext";
import { formatDate } from "../utils/helpers";
import { CiCalendar } from "react-icons/ci";

const DataTable = () => {
  const { currentFormData } = useForm();
  const { responses, content } = currentFormData;

  // Create a list of column headers based on unique keys from all responses
  const counts = {};
  const result = [];

  content.forEach(el => {
    if (el.type === "input") {
      const type = el.input_type;
      if (!counts[type]) {
        counts[type] = 0;
      }
      counts[type]++;
      result.push(`${type} ${counts[type]}`);
    }
  });

  // Extract all unique keys from the responses
  const allKeys = new Set();
  responses.forEach(row => {
    if (row.responses[0]) {
      Object.keys(row.responses[0]).forEach(key => allKeys.add(key));
    }
  });
  
  const uniqueKeys = Array.from(allKeys);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th><CiCalendar />&nbsp;&nbsp;Submitted at</th>
            {result.map((curr, index) => (
              <th key={index}>{curr}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((row, rowIndex) => {
            const responseValues = row.responses[0] || {};
            return (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                <td>{formatDate(row.createdAt)}</td>
                {uniqueKeys.map((key, colIndex) => (
                  <td key={colIndex}>
                    {responseValues[key] !== undefined ? responseValues[key] : ''}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
