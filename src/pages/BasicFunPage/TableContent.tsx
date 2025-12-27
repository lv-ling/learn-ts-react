import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useTableHeightCalc } from "@/hooks/useTableHeightCalc";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

function TableContent() {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      minWidth: 200,
      fixed: "left",
    },
    {
      title: "Age",
      dataIndex: "age",
      minWidth: 200,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Age1",
      dataIndex: "age",
      minWidth: 200,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Age2",
      dataIndex: "age",
      minWidth: 200,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value as string),
      filterSearch: true,
      minWidth: 200,
    },
    {
      title: "Address1",
      dataIndex: "address1",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value as string),
      filterSearch: true,
      minWidth: 200,
    },
  ];

  const data = Array.from({ length: 100 }).map((_, index) => {
    return {
      key: `row-${index}`,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    };
  });

  const { wrapperRef, remainHeight } = useTableHeightCalc({ gap: 16 });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div
      className="bg-white p-2 rounded-lg"
      ref={wrapperRef}
      style={{
        height: "300px",
      }}
    >
      <Table<DataType>
        className="bg-white"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        scroll={{ x: "max-content", y: remainHeight }}
      />
    </div>
  );
}

export default TableContent;
