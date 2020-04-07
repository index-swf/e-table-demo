/* eslint-disable react/prop-types */
import React, { useMemo, useState, useCallback } from "react";
import { TableContext } from "./common";
import { Table, Form, Space, Button, Popconfirm } from "antd";
import "antd/dist/antd.css";

const Operation = ({ index }) => {
  const {
    edit,
    deleteRecord,
    save,
    cancel,
    currentEditIndex
  } = React.useContext(TableContext);

  return (
    <Space>
      {currentEditIndex === index ? (
        <>
          <Button size="small" type="primary" onClick={save}>
            保存
          </Button>
          <Button size="small" onClick={cancel}>
            取消
          </Button>
        </>
      ) : (
        <>
          <Button size="small" type="primary" onClick={() => edit(index)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此项？"
            onConfirm={() => deleteRecord(index)}
          >
            <Button size="small" type="danger">
              删除
            </Button>
          </Popconfirm>
        </>
      )}
    </Space>
  );
};

const defaultOperationColumn = {
  key: "operation",
  title: "操作",
  width: 120,
  render: (text, record, index) => {
    return <Operation index={index} />;
  }
};

const defaultRender = text => text || null;

const TableDataCell = ({ renderArgs, columnItem }) => {
  const {
    render: originRender = defaultRender,
    editor,
    formItemProps,
    dataIndex
  } = columnItem;
  const [, , index] = renderArgs;
  const { currentEditIndex } = React.useContext(TableContext);
  const isEditMode = index === currentEditIndex;

  return isEditMode ? (
    <Form.Item name={dataIndex} {...formItemProps}>
      {editor}
    </Form.Item>
  ) : (
    originRender(...renderArgs)
  );
};

const mergeEditorRender = columnItem => {
  if (!("editor" in columnItem)) {
    // 不可编辑列，原样返回
    return columnItem;
  }

  return {
    ...columnItem,
    render: (...args) => {
      return <TableDataCell renderArgs={args} columnItem={columnItem} />;
    }
  };
};

const ETable = props => {
  const {
    value,
    onChange,
    columns,
    tableProps,
    formProps,
    operationColumn,
    newItemDefaultValue
  } = props;
  if (typeof onChange !== "function") {
    throw new Error(
      "props.onChange must be a function, and this component can only work in controlled mode!"
    );
  }
  if (!Array.isArray(value)) {
    throw new Error("props.value must be an array.");
  }

  const [form] = Form.useForm();
  const mergedColumns = useMemo(
    () => [...columns.map(mergeEditorRender), operationColumn],
    [columns, operationColumn]
  );
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const edit = useCallback(
    index => {
      form.setFieldsValue(value[index]);
      setCurrentEditIndex(index);
    },
    [form, value]
  );
  const deleteRecord = useCallback(
    index => {
      const newValue = value.slice();

      newValue.splice(index, 1);
      onChange(newValue);
    },
    [value, onChange]
  );
  const save = useCallback(() => {
    form.validateFields().then(values => {
      const newValue = value.slice();

      newValue.splice(currentEditIndex, 1, values);
      onChange(newValue);
      setCurrentEditIndex(null);
      form.resetFields();
    });
  }, [value, currentEditIndex, form, onChange]);
  const cancel = useCallback(() => {
    form.resetFields();
    setCurrentEditIndex(null);
  }, [form]);
  const contextValue = useMemo(
    () => ({
      edit,
      deleteRecord,
      save,
      cancel,
      currentEditIndex,
      form
    }),
    [edit, deleteRecord, save, cancel, currentEditIndex, form]
  );
  const addItem = () => {
    onChange([...value, newItemDefaultValue]);
  };

  return (
    <TableContext.Provider value={contextValue}>
      <Form {...formProps} form={form}>
        <Table {...tableProps} columns={mergedColumns} dataSource={value} />
      </Form>
      <Space>
        <Button type="primary" onClick={addItem}>
          添加项目
        </Button>
      </Space>
    </TableContext.Provider>
  );
};

ETable.defaultProps = {
  value: [],
  newItemDefaultValue: {},
  tableProps: {
    pagination: false,
  },
  operationColumn: defaultOperationColumn
};

export default ETable;
