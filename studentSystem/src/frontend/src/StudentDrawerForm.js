import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from "antd";
import { addNewStudent } from "./client";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { successNotification, errorNotification } from "./notification";



const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize:24}} spin/>;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudent}){

    const onClose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = student =>{
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student).then(()=>{
            console.log('added student')
            onClose();
            successNotification("student success added", `${student.name} was added to the system`);
            fetchStudent();
        }).catch(err =>{
            err.response.json().then(resp=>{
                errorNotification("There was an issue", `${resp.message} [status code ${resp.status}][${resp.error}]`)
               })
        }).finally(()=>{
            setSubmitting(false)
        })
    };

    const onFinishFailed = errorInfo =>{
        alert(JSON.stringify(errorInfo, null, 2))
    }

    return <Drawer 
        title = "Create new Student"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign:'right'
                }}
            >
                <Button onClick={onClose} style={{marginRight : 8}}> 
                    Cancel
                </Button>    
            </div>
        }
    >
        <Form layout="vertical"
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required:true, message: "Please enter student name"}]}
                    >
                        <Input placeholder="Please inter student name"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required:true, message: "Please enter student email"}]}
                    >
                        <Input placeholder="Please inter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required:true, message: "Please select student gender"}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option id='MALE' value='MALE'>MALE</Option>
                            <Option id='FEMALE' value='FEMALE'>FEMALE</Option>
                            <Option id='OTHER' value='OTHER'>OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                     <Form.Item>
                        <Button type="primary" htmlType="submit">
                            submit
                        </Button>
                     </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}
export default StudentDrawerForm;