import React, { Component } from 'react'

import { Form, Icon, Input, Button } from 'antd';

import ChainChoices from './ChainChoices'

import "./AccountInputForm.css"

import  emitter  from "./Events"

import {GetBalance} from './HttpUtils'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    
  }

  handleSubmit = (e) => {

    e.preventDefault();
    let formData;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        formData = values
        console.log('Received values of form: ', values);
      }
    });

    // let resp = GetBalance('12321')
    // resp.then(data => {console.log('got balance: ', data);})

  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const accountAddrError = isFieldTouched('accountAddr') && getFieldError('accountAddr');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="HeaderForm">
        <FormItem
          validateStatus={accountAddrError ? 'error' : ''}
          help={accountAddrError || ''}
        >
          {getFieldDecorator('accountAddr', {
            rules: [{ required: true, message: 'Please input your wallte address!' }],
          })(
            <ChainChoices></ChainChoices>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{span: 24}}
          style={{ width: '42%'}}
          validateStatus={accountAddrError ? 'error' : ''}
          help={accountAddrError || ''}
        >
          {getFieldDecorator('accountAddr', {
            rules: [{ required: true, message: 'Please input your wallte address!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Input new wallet address" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Confirm
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const AccountInputForm = Form.create()(HorizontalLoginForm);

export default AccountInputForm
