import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { currentsetting } from "config/index.js";
import { Tooltip, Modal, Row, Col } from "antd";
import { SaveOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormBuild from "Form/AntFormBuild";
import AntFormDisplay from "Form/AntFormDisplay";
import _ from "lodash";
import useForceUpdate from "use-force-update";
import "components/Common/Antd.css";
import IconButton from "@material-ui/core/IconButton";
import ListGen from "components/SKD/ListGen";
import MoreMenu from "components/SKD/MoreMenu";

const FormEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  //for snackbar open/close
  const [visible, setVisible] = useState(false);
  const [setting, setSetting] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  let formdt1 = {
    data: {
      setting: {
        formItemLayout: {
          labelCol: { span: 2 },
          wrapperCol: { span: 22 },
        },
        layout: "horizontal",
        formColumn: 1,
        size: "middle",
        lineheight: "middle",
      },
      list: [],
    },
  };

  let newFormData = useSelector((state) => state.global.currentData);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  //if (!selectedKey) history.push("/admin/control/form");
  if (selectedKey === "imsi") selectedKey = "";

  let initialValue = {};

  let currFormData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      layout: "horizontal",
      formColumn: 2,
      size: "middle",
      lineheight: "middle",
      initialValues: {
        ...{ initialValue },
      },

      onValuesChange: (changedValues, allValues) => {
        // if (newFormData) {
        //   let sett = newFormData?.data?.setting;
        //   if (!sett) sett = {};
        //   if (!sett.formItemLayout)
        //     sett = {
        //       ...sett,
        //       formItemLayout: {
        //         labelCol: { span: "" },
        //         wrapperCol: { span: "" },
        //       },
        //     };
        //   sett = {
        //     ...sett,
        //     formItemLayout: {
        //       labelCol: { span: allValues.labelwidth },
        //       wrapperCol: { span: 24 - allValues.labelwidth },
        //     },
        //   };
        //   sett.formColumn = allValues.column;
        //   sett.layout = allValues.layout;
        //   sett.size = allValues.size;
        //   sett.lineheight = allValues.lineheight;
        // }

        //forceUpdate();
        localStorage.setItem("allValues", JSON.stringify(allValues));
        const updform = updateForm(newFormData, allValues);
        dispatch(globalVariable({ currentData: updform }));
        localStorage.removeItem("allValues");
        onReload();
      },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },

    list: [
      {
        label: "Column",
        name: "column",
        type: "select",
        defaultValue: 1,
        optionArray: [
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
        ],
        seq: 3,
      },
      {
        label: "Layout",
        name: "layout",
        type: "radio.button",
        defaultValue: "horizontal",
        optionArray: [
          { text: "horizontal", value: "horizontal" },
          { text: "vertical", value: "vertical" },
          { text: "inline", value: "inline" },
        ],
        seq: 4,
      },
      {
        label: "Label Width",
        name: "labelwidth",
        type: "slider",
        min: 0,
        max: 24,
        defaultValue: 6,
        marks: {
          0: 0,
          2: 2,
          4: 4,
          6: 6,
          8: 8,
          10: 10,
          12: 12,
          14: 14,
          16: 16,
          18: 18,
          20: 20,
          22: 22,
          24: 24,
        },
        seq: 5,
      },
      {
        label: "Size",
        name: "size",
        type: "radio.button",
        defaultValue: "middle",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 6,
      },
      {
        label: "LineHeight",
        name: "lineheight",
        type: "radio.button",
        defaultValue: "middle",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 7,
      },
    ],
  };

  let updateInitialValues = (currFormData, newFormData) => {
    if (!currFormData) return;
    const initialValue = {
      column: newFormData.data?.setting?.formColumn,
      labelwidth: newFormData.data?.setting?.formItemLayout?.labelCol?.span | 2,
      layout: newFormData.data?.setting.layout,
      size: newFormData.data?.setting.size,
      lineheight: newFormData.data?.setting.lineheight,
    };

    currFormData.setting.initialValues = initialValue;
    return currFormData;
  };

  const [sumdt, setSumdt] = useState();
  useEffect(() => {
    // if (newFormData === "") {
    //   dispatch(globalVariable({ currentData: formdt1 }));
    //   localStorage.setItem("currentData", JSON.stringify(formdt1));
    // } else {
    //   const newcurrFormData = updateInitialValues(currFormData, newFormData);
    //   setSumdt(newcurrFormData);
    // }
    window.addEventListener("message", (event) => {
      // IMPORTANT: check the origin of the data!

      //if (event.origin.startsWith("http://localhost:3000")) {
      // The data was sent from your site.
      // Data sent with postMessage is stored in event.data:

      let set = event.data?.data?.setting;
      if (!set) return;
      const init = {
        column: set.formColumn,
        labelwidth: set.formItemLayout?.labelCol?.span | 2,
        layout: set.layout,
        size: set.size,
        lineheight: set.lineheight,
      };
      event.data.data.setting.initialValues = init;
      if (!set.formItemLayout) {
        set = {
          ...set,
          formItemLayout: { labelCol: { span: 2 }, wrapperCol: { span: 22 } },
        };
      }
      dispatch(globalVariable({ currentData: event.data }));

      localStorage.setItem("currentData", JSON.stringify(event.data));
      onReload();
    });
  }, []);
  useEffect(() => {
    let sumdt1 = sumdt;
    if (newFormData !== "") if (!sumdt1) sumdt1 = currFormData;
    setSumdt(updateInitialValues(sumdt1, newFormData));
    if (checkisDiff === true) {
      localStorage.setItem("currentData", JSON.stringify(newFormData));
      onReload();
    }

    //   //if (newFormData._id) setUpdate(true);
  }, [newFormData]);
  const checkisDiff = () => {
    const currentData = localStorage.getItem("currentData");
    if (!currentData) return true;
    if (currentData === JSON.stringify(newFormData)) {
      console.log("its same");
      return false;
    } else return true;
    return false;
  };
  const updateForm = (newform, allValues) => {
    newform.data.setting.formItemLayout = {
      labelCol: { span: allValues.labelwidth },
      wrapperCol: { span: 24 - allValues.labelwidth },
    };
    newform.data.setting.formColumn = allValues.column;
    newform.data.setting.layout = allValues.layout;
    newform.data.setting.size = allValues.size;
    newform.data.setting.lineheight = allValues.lineheight;
    delete newform.data.setting.initialValues;
    delete newform.data.setting.initial;

    return newform;
  };

  const cleanuplist = (list) => {
    const deletetrash = (k) => {
      let kk = { ...k };
      delete kk.formColumn;
      delete kk.layout;
      delete kk.formItemLayout;
      delete kk.tailLayout;
      delete kk.editable;
      return kk;
    };
    list.map((k, i) => {
      let kk = { ...k };
      if (k.type === "nostyle")
        kk.array.map((a, b) => {
          let newa = deletetrash(a);
          kk.array.splice(b, 1, newa);
          return null;
        });
      kk = deletetrash(kk);
      list.splice(i, 1, kk);
      return null;
    });
    return list;
  };

  const menu = [
    {
      title: (
        <Tooltip title="Form List" key="1saveas" placement="left">
          <MenuOutlined />
        </Tooltip>
      ),
      onClick: () => {
        setVisible(true);
      },
    },
    {
      title: (
        <Tooltip title="Form Setting" key="1setting" placement="left">
          <SettingOutlined />
        </Tooltip>
      ),
      onClick: () => {
        setSetting(true);
      },
    },
  ];
  const extra = (
    <Row justify="end">
      <Col>
        <Tooltip title="Save & back" key="1save">
          <IconButton
            aria-label="save"
            onClick={() => {
              delete newFormData.data.setting.onValuesChange;
              //cleanup list
              const list = cleanuplist(newFormData.data.list);
              newFormData.data.list = list;
              newFormData.type = "form";
              let allval = localStorage.getItem("allValues");
              if (allval) {
                const updform = updateForm(newFormData, JSON.parse(allval));
                dispatch(globalVariable({ currentData: updform }));

                localStorage.removeItem("currentData");
                localStorage.removeItem("allValues");
                onReload();
              }
              window.parent.postMessage(JSON.stringify(newFormData), "*");
            }}
          >
            <SaveOutlined />
          </IconButton>
        </Tooltip>
      </Col>
      <Col>
        <MoreMenu menu={menu} />
      </Col>
    </Row>
  );

  const dataformat = ["_id", "data", "title", "desc", "type"];
  const selectHandler = (item) => {
    console.log("selected123", item, item.id);
    dispatch(globalVariable({ currentData: item }));

    localStorage.setItem("currentData", JSON.stringify(item));
    dispatch(globalVariable({ selectedKey: item._id }));
    axios
      .get(`${currentsetting.webserviceprefix}bootform/${item._id}`)
      .then((response) => {
        dispatch(globalVariable({ currentData: response.data }));
        localStorage.setItem("currentData", JSON.stringify(response.data));
      });
    // history.push(`/view?_id=${item._id}`);
    setVisible(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
  };
  const settingSave = () => {};
  const formlist = (
    <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
    >
      <>
        <ListGen
          url="bootform"
          notitle={true}
          nodelete
          noedit
          selectHandler={selectHandler}
          dataformat={["_id", "data", "title", "desc", "type"]}
        />
      </>
    </Modal>
  );
  const settingpage = (
    <Modal
      title="Setting"
      visible={setting}
      onOk={settingSave}
      confirmLoading={confirmLoading}
      onCancel={() => setSetting(false)}
    >
      <>
        <AntFormDisplay formid="5f45f4389461621a00fbe017" />
      </>
    </Modal>
  );
  const onReload = () => {
    history.push("/admin/control/form/formview?rtn=formEdit");
  };

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead ghost={false}>
          {extra}
          {sumdt && <AntFormDisplay formArray={sumdt} name={"fsummary"} />}
        </PageHead>
      </div>
      <div style={{ margin: 10 }}>
        <AntFormBuild formdt={newFormData} reload={onReload} />
      </div>
      {formlist}
      {settingpage}
    </>
  );
};

export default FormEdit;
