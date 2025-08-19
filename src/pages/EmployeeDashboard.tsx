import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  User,
  Loader2
} from 'lucide-react';
import Footer from '@/components/footer';

// Validation schema for sick leave
const sickLeaveSchema = Yup.object().shape({
  startDate: Yup.date()
    .min(new Date(), 'Start date cannot be in the past')
    .required('Start date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  reason: Yup.string()
    .min(10, 'Please provide more details (at least 10 characters)')
    .max(500, 'Reason must be less than 500 characters')
    .required('Reason is required'),
  type: Yup.string()
    .oneOf(['sick', 'medical'], 'Please select a valid leave type')
    .required('Leave type is required'),
});

interface SickLeaveFormValues {
  startDate: string;
  endDate: string;
  reason: string;
  type: string;
}

// Mock data for employee's leave history
const employeeLeaveHistory = [
  { id: "REQ-2001", type: "Sick Leave", startDate: "2025-07-15", endDate: "2025-07-16", status: "Approved", reason: "Fever and cold" },
  { id: "REQ-2002", type: "Medical Leave", startDate: "2025-06-20", endDate: "2025-06-22", status: "Approved", reason: "Medical checkup" },
  { id: "REQ-2003", type: "Sick Leave", startDate: "2025-08-10", endDate: "2025-08-10", status: "Pending", reason: "Stomach flu" },
];

const leaveBalance = {
  sickLeave: { used: 5, total: 12, remaining: 7 },
  medicalLeave: { used: 3, total: 10, remaining: 7 },
};

const EmployeeDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const userFirstName = localStorage.getItem('userFirstName') || 'Employee';

  const leaveTypeOptions = [
    { value: '', label: 'Select Leave Type' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'medical', label: 'Medical Leave' },
  ];

  const initialValues: SickLeaveFormValues = {
    startDate: '',
    endDate: '',
    reason: '',
    type: '',
  };

  const handleSubmit = async (values: SickLeaveFormValues, { resetForm }: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/sick-leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          employeeName: userFirstName,
          submittedDate: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Sick leave request submitted successfully!');
        resetForm();
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 3000);
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        setSubmitMessage((data as any).message || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      // Fallback for demo purposes
      setSubmitStatus('success');
      setSubmitMessage('Sick leave request submitted successfully! (Demo mode)');
      resetForm();
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-form-background to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome, {userFirstName}!</h1>
          <p className="text-muted-foreground">Manage your sick leave requests and view your leave balance.</p>
        </div>

        {/* Leave Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sick Leave Remaining</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance.sickLeave.remaining}</div>
              <p className="text-xs text-muted-foreground">out of {leaveBalance.sickLeave.total} days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medical Leave Remaining</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance.medicalLeave.remaining}</div>
              <p className="text-xs text-muted-foreground">out of {leaveBalance.medicalLeave.total} days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {employeeLeaveHistory.filter(req => req.status === 'Pending').length}
              </div>
              <p className="text-xs text-muted-foreground">awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Year</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {employeeLeaveHistory.filter(req => req.status === 'Approved').length}
              </div>
              <p className="text-xs text-muted-foreground">requests approved</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sick Leave Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit Sick Leave Request</CardTitle>
                <CardDescription>Request sick leave or medical leave for health-related absences.</CardDescription>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={initialValues}
                  validationSchema={sickLeaveSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, values }) => (
                    <Form className="space-y-4">
                      <Field name="type">
                        {({ field }: any) => (
                          <SelectField
                            {...field}
                            id="type"
                            label="Leave Type"
                            icon={<FileText size={18} />}
                            options={leaveTypeOptions}
                            error={touched.type && errors.type ? errors.type : undefined}
                            required
                          />
                        )}
                      </Field>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="startDate">
                          {({ field }: any) => (
                            <InputField
                              {...field}
                              id="startDate"
                              type="date"
                              label="Start Date"
                              icon={<CalendarIcon size={18} />}
                              error={touched.startDate && errors.startDate ? errors.startDate : undefined}
                              required
                            />
                          )}
                        </Field>

                        <Field name="endDate">
                          {({ field }: any) => (
                            <InputField
                              {...field}
                              id="endDate"
                              type="date"
                              label="End Date"
                              icon={<CalendarIcon size={18} />}
                              error={touched.endDate && errors.endDate ? errors.endDate : undefined}
                              required
                            />
                          )}
                        </Field>
                      </div>

                      <Field name="reason">
                        {({ field }: any) => (
                          <div className="space-y-2">
                            <label htmlFor="reason" className="text-sm font-medium text-foreground">
                              Reason for Leave *
                            </label>
                            <textarea
                              {...field}
                              id="reason"
                              placeholder="Please provide details about your illness or medical condition..."
                              className="w-full min-h-[100px] p-3 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                              rows={4}
                            />
                            {touched.reason && errors.reason && (
                              <p className="text-sm text-destructive">{errors.reason}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className="text-green-600" />
                            <p className="text-sm text-green-800">{submitMessage}</p>
                          </div>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <AlertCircle size={16} className="text-red-600" />
                            <p className="text-sm text-red-800">{submitMessage}</p>
                          </div>
                        </motion.div>
                      )}

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full btn-primary h-12 text-base font-semibold"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 size={20} className="animate-spin" />
                            <span>Submitting Request...</span>
                          </div>
                        ) : (
                          'Submit Sick Leave Request'
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Quick Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <Calendar 
                  mode="single" 
                  selected={selectedDate} 
                  onSelect={setSelectedDate} 
                  className="w-full" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sick Leave</span>
                  <span className="text-sm text-muted-foreground">
                    {leaveBalance.sickLeave.remaining}/{leaveBalance.sickLeave.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(leaveBalance.sickLeave.remaining / leaveBalance.sickLeave.total) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Medical Leave</span>
                  <span className="text-sm text-muted-foreground">
                    {leaveBalance.medicalLeave.remaining}/{leaveBalance.medicalLeave.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(leaveBalance.medicalLeave.remaining / leaveBalance.medicalLeave.total) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leave History */}
        <Card>
          <CardHeader>
            <CardTitle>Your Leave History</CardTitle>
            <CardDescription>View all your previous and current leave requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeLeaveHistory.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Approved':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
    case 'Pending':
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    case 'Rejected':
      return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default EmployeeDashboard;
