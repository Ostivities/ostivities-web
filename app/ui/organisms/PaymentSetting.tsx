import { useState } from "react";
import H4 from "../atoms/H4";
import ToggleSwitch from "../atoms/ToggleSwitch";
import { NigerianBanks } from "@/app/utils/data";
import { Button, Form, Input, Row, Col, Select, notification, message } from "antd";
import { Label } from "@/app/components/typography/Typography";

const PaymentSetting = () => {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [accountName, setAccountName] = useState("");
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState(false); // New state for edit mode

  const handleToggle = (label: string) => {
    setActiveToggle((prev) => (prev === label ? null : label));
  };

  const accountNames: { [key: string]: string } = {
    "bank1-123456": "John Doe",
    "bank2-654321": "Jane Smith",
  };

  const fetchAccountName = (bankName: string, accountNumber: string): string => {
    const key = `${bankName}-${accountNumber}`;
    return accountNames[key] || "";
  };

  const handleBankNameChange = (value: string) => {
    const accountNumber = form.getFieldValue("accountNumber");
    if (accountNumber) {
      const fetchedAccountName = fetchAccountName(value, accountNumber);
      setAccountName(fetchedAccountName);
    }
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bankName = form.getFieldValue("bankName");
    if (bankName) {
      const fetchedAccountName = fetchAccountName(bankName, e.target.value);
      setAccountName(fetchedAccountName);
    }
  };

  const handleButtonClick = () => {
    if (isEditable) {
      form.validateFields().then(() => {
        // Simulate account update
        message.success ("Account details updated successfully!")       
        setIsEditable(false); // Switch back to non-editable mode
      });
    } else {
      setIsEditable(true); // Enable editing
    }
  };

  return (
    <form className="px-12 py-5 min-h-[60vh] flex flex-col items-center justify-between">
      <div className="self-start">
        <>
          <H4 content="Payment Setting" style={{ fontSize: '22px' }} />
          <p
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontWeight: "350",
              fontSize: '14px',
            }}
            className="text-OWANBE_PRY mt-1 mb-5"
          >
            When would you like to receive payouts of your event ticket sales?
          </p>
        </>

        <div className="flex flex-col gap-y-8 mt-7">
          <ToggleSwitch
            label="weeklyPayment"
            description="Weekly, Payments will be grouped and processed weekly, with disbursements made every Friday."
            isActive={activeToggle === "weeklyPayment"}
            onToggle={() => handleToggle("weeklyPayment")}
          />

          <ToggleSwitch
            label="monthlyPayment"
            description="Monthly, Payments will be processed and disbursed monthly on the last Friday of each month."
            isActive={activeToggle === "monthlyPayment"}
            onToggle={() => handleToggle("monthlyPayment")}
          />
        </div>

        <div className="mt-12">
          <H4 content="Account Details" style={{ fontSize: '22px' }} />
          <p
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontWeight: "350",
              fontSize: '14px',
            }}
            className="text-OWANBE_PRY mt-1 mb-3"
          >
            Update your account details here. Please note that changes can only be made up to 2 days before your next payout date. 
          </p>

          <Form layout="vertical" form={form} className="flex flex-col gap-y-1 mt-5">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="bankName"
                  label={<Label content="Bank Name" className="text-sm font-medium" />}
                  rules={[{ required: true, message: "Please select your bank" }]}
                >
                  <Select
                    placeholder="Select Bank"
                    onChange={handleBankNameChange}
                    disabled={!isEditable} // Disable if not editable
                  >
                    {NigerianBanks.map((bank) => (
                      <Select.Option value={bank.value} key={bank.value}>
                        {bank.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="accountNumber"
                  label={<Label content="Account Number" className="text-sm font-medium" />}
                  rules={[{ required: true, message: "Please input your account number" }]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your account number"
                    onChange={handleAccountNumberChange}
                    disabled={!isEditable} // Disable if not editable
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="accountName"
              label={<Label content="Account Name" className="text-sm font-medium" />}
              style={{ marginTop: 1 }}
            >
              <Input
                type="text"
                value={accountName}
                placeholder="Account name will appear here"
                readOnly
              />
            </Form.Item>
          </Form>
        </div>
      </div>

      <Button
        type="primary"
        onClick={handleButtonClick} // Change from htmlType="submit" to onClick
        size="large"
        className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
        style={{ marginTop: "20px" }}
      >
        {isEditable ? "Save Changes" : "Update"} {/* Conditional button text */}
      </Button>
    </form>
  );
};

export default PaymentSetting;
