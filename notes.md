   <Form {...formItemLayout} style={{ maxWidth: "100%" }}>
          <Row justify="start" className="w-full">
            <Col span={12}>
              <>
                <Form.Item
                  label="Event Name"
                  name="eventName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your event name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={"eventDetails"}
                  label="Event Details"
                  style={{ minheight: "200px !important" }}
                >
                  <Input.TextArea style={{ minheight: "200px !important" }} />
                </Form.Item>

                <Form.Item
                  name="eventState"
                  label="Event State"
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Event Address"
                  name="eventAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your event name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            </Col>
            <Col span={12}>
              <>
                <Form.Item label="Custom URL">
                  <Space.Compact>
                    <Form.Item
                      name="baseUrl"
                      rules={[
                        {
                          required: true,
                          message: "Please input your event name!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderTopRightRadius: "0px !important",
                          borderBottomRightRadius: "0px !important",
                        }}
                        defaultValue="Ostivities.com/discover"
                        readOnly
                      />
                    </Form.Item>
                    <Form.Item
                      name="eventUrl"
                      rules={[
                        {
                          required: true,
                          message: "Please input your event name!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderTopLeftRadius: "0px !important",
                          borderBottomLeftRadius: "0px !important",
                        }}
                        defaultValue=""
                        placeholder="enter desired name"
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>

                <Form.Item
                  name="doc"
                  label="Supporting Doc"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="*Only JPEG, PNG & PDF Allowed & File size should not be more than 10MB "
                  style={{ width: "100% !important" }}
                >
                  <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture"
                    style={{ width: "100% !important" }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  name="eventState"
                  label="Event type"
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="select your event type">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Event Address"
                  name="eventAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your event name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="eventInfo" label="Event Info">
                  {/* <Form.Item></Form.Item> */}

                  <Form.Item
                    name="donation"
                    rules={[
                      {
                        required: true,
                        message: "Please input donation amount!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={EVENT_INFO.SINGLE_EVENT}>
                        Single Event
                      </Radio>
                      <Radio value={EVENT_INFO.RECURRING_EVENT}>
                        Recurring Event
                      </Radio>
                    </Radio.Group>
                    <Space.Compact>
                      <Input
                        defaultValue="Xihu District, Hangzhou"
                        style={{
                          borderTopRightRadius: "0px !important",
                          borderBottomRightRadius: "0px !important",
                        }}
                      />
                      <Select
                        defaultValue="Zhejiang"
                        options={[]}
                        style={{
                          borderTopLeftRadius: "0px !important",
                          borderBottomLeftRadius: "0px !important",
                        }}
                      />
                    </Space.Compact>
                  </Form.Item>
                </Form.Item>
              </>
            </Col>
          </Row>
        </Form>