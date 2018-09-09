import React, { Component } from 'react';

const { Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
    Cascader, Slider, Button, Col, Upload, Icon } = antd;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const areaData = [{
value: 'shanghai',
label: '上海',
children: [{
value: 'shanghaishi',
label: '上海市',
children: [{
 value: 'pudongxinqu',
 label: '浦东新区',
}],
}],
}];

class Demo extends React.Component{
handleSubmit(e) {
e.preventDefault();
console.log('收到表单值：', this.props.form.getFieldsValue());
},

normFile(e) {
if (Array.isArray(e)) {
 return e;
}
return e && e.fileList;
},

render() {
const { getFieldProps } = this.props.form;
return (
 <Form onSubmit={this.handleSubmit} horizontal>
       <FormItem
         key = '1'
         wrapperCol = {{span:'5'}}>
         <Select
           placeholder='请选择类型'
           {...getFieldProps('super_category_id',)}>
           <Option key = '1'>111</Option>
         </Select>
       </FormItem>
       <FormItem
         key = '2'
         wrapperCol = {{span:'5'}}>
         <Select
           placeholder='请选择类型'
           {...getFieldProps('super_category_id',)}>
           <Option key = '1'>111</Option>
         </Select>
       </FormItem>
 </Form>
);
},
}

SelectForm = Form.create()(Demo);

export default SelectForm
