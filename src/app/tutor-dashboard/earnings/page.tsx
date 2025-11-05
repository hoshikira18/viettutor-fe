"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Download,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  User,
  BookOpen,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Edit,
  Plus,
  Save,
} from "lucide-react";

// Mock earnings data
const mockEarnings = {
  overview: {
    totalEarnings: 45600000,
    thisMonth: 8400000,
    pendingPayments: 2100000,
    completedSessions: 156,
    averageHourlyRate: 280000,
    growthRate: 12.5,
  },
  transactions: [
    {
      id: "1",
      studentName: "Nguyễn Minh An",
      subject: "Toán học",
      sessionDate: "2024-11-05",
      duration: 90,
      rate: 300000,
      amount: 450000,
      status: "completed",
      paymentStatus: "paid",
      paymentDate: "2024-11-06",
      paymentMethod: "bank_transfer",
    },
    {
      id: "2",
      studentName: "Trần Thu Hà",
      subject: "Tiếng Anh",
      sessionDate: "2024-11-04",
      duration: 120,
      rate: 250000,
      amount: 500000,
      status: "completed",
      paymentStatus: "pending",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "3",
      studentName: "Lê Minh Đức",
      subject: "Vật lý",
      sessionDate: "2024-11-03",
      duration: 90,
      rate: 280000,
      amount: 420000,
      status: "completed",
      paymentStatus: "paid",
      paymentDate: "2024-11-04",
      paymentMethod: "cash",
    },
    {
      id: "4",
      studentName: "Nguyễn Minh An",
      subject: "Toán học",
      sessionDate: "2024-11-02",
      duration: 90,
      rate: 300000,
      amount: 450000,
      status: "completed",
      paymentStatus: "overdue",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "5",
      studentName: "Phạm Thị Lan",
      subject: "Hóa học",
      sessionDate: "2024-11-01",
      duration: 120,
      rate: 260000,
      amount: 520000,
      status: "completed",
      paymentStatus: "paid",
      paymentDate: "2024-11-02",
      paymentMethod: "bank_transfer",
    },
  ],
  monthlyEarnings: [
    { month: "Jan 2024", amount: 7200000, sessions: 24 },
    { month: "Feb 2024", amount: 8100000, sessions: 27 },
    { month: "Mar 2024", amount: 7800000, sessions: 26 },
    { month: "Apr 2024", amount: 8900000, sessions: 29 },
    { month: "May 2024", amount: 9200000, sessions: 31 },
    { month: "Jun 2024", amount: 8700000, sessions: 28 },
    { month: "Jul 2024", amount: 9600000, sessions: 32 },
    { month: "Aug 2024", amount: 8800000, sessions: 29 },
    { month: "Sep 2024", amount: 9100000, sessions: 30 },
    { month: "Oct 2024", amount: 8400000, sessions: 28 },
    { month: "Nov 2024", amount: 8400000, sessions: 28 },
  ],
  payoutMethods: [
    {
      id: "1",
      type: "bank_transfer",
      accountName: "Nguyễn Văn An",
      accountNumber: "0123456789",
      bankName: "Vietcombank",
      isDefault: true,
    },
    {
      id: "2",
      type: "momo",
      phoneNumber: "+84901234567",
      isDefault: false,
    },
  ],
};

export default function TutorEarningsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Đã thanh toán
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Chờ thanh toán</Badge>;
      case "overdue":
        return <Badge variant="destructive">Quá hạn</Badge>;
      case "processing":
        return <Badge variant="outline">Đang xử lý</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodText = (method: string | null) => {
    if (!method) return "-";
    switch (method) {
      case "cash":
        return "Tiền mặt";
      case "bank_transfer":
        return "Chuyển khoản";
      case "momo":
        return "MoMo";
      case "credit_card":
        return "Thẻ tín dụng";
      default:
        return method;
    }
  };

  const filterTransactions = () => {
    return mockEarnings.transactions.filter((transaction) => {
      const matchesSearch =
        transaction.studentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || transaction.paymentStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  };

  const calculatePeriodEarnings = (period: string) => {
    const today = new Date();
    let startDate: Date;

    switch (period) {
      case "thisWeek":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        break;
      case "thisMonth":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "thisYear":
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    const filteredTransactions = mockEarnings.transactions.filter(
      (transaction) => {
        const transactionDate = new Date(transaction.sessionDate);
        return (
          transactionDate >= startDate && transaction.paymentStatus === "paid"
        );
      }
    );

    return filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };

  const getEarningsGrowth = () => {
    const thisMonth =
      mockEarnings.monthlyEarnings[mockEarnings.monthlyEarnings.length - 1];
    const lastMonth =
      mockEarnings.monthlyEarnings[mockEarnings.monthlyEarnings.length - 2];

    if (!lastMonth) return 0;

    return ((thisMonth.amount - lastMonth.amount) / lastMonth.amount) * 100;
  };

  const getPendingAmount = () => {
    return mockEarnings.transactions
      .filter(
        (t) => t.paymentStatus === "pending" || t.paymentStatus === "overdue"
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getOverdueAmount = () => {
    return mockEarnings.transactions
      .filter((t) => t.paymentStatus === "overdue")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thu nhập</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thu nhập và thanh toán từ việc dạy học
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">Tuần này</SelectItem>
              <SelectItem value="thisMonth">Tháng này</SelectItem>
              <SelectItem value="thisYear">Năm này</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="transactions">Lịch sử giao dịch</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          <TabsTrigger value="payouts">Phương thức thanh toán</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(calculatePeriodEarnings(selectedPeriod))}
                    </p>
                    <p className="text-gray-600">
                      Thu nhập{" "}
                      {selectedPeriod === "thisMonth"
                        ? "tháng này"
                        : selectedPeriod === "thisWeek"
                        ? "tuần này"
                        : "năm này"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(getPendingAmount())}
                    </p>
                    <p className="text-gray-600">Chờ thanh toán</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {mockEarnings.overview.completedSessions}
                    </p>
                    <p className="text-gray-600">Buổi hoàn thành</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(mockEarnings.overview.averageHourlyRate)}
                    </p>
                    <p className="text-gray-600">Giá TB/giờ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growth Indicator */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tăng trưởng thu nhập
                  </h3>
                  <p className="text-gray-600">So với tháng trước</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getEarningsGrowth() >= 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                  <span
                    className={`text-lg font-semibold ${
                      getEarningsGrowth() >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {Math.abs(getEarningsGrowth()).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overdue Payments Alert */}
          {getOverdueAmount() > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">
                      Thanh toán quá hạn
                    </h3>
                    <p className="text-red-700">
                      Bạn có {formatCurrency(getOverdueAmount())} từ các buổi
                      học chưa được thanh toán
                    </p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Giao dịch gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEarnings.transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {transaction.studentName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {transaction.subject} -{" "}
                          {new Date(transaction.sessionDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(transaction.amount)}
                      </p>
                      {getPaymentStatusBadge(transaction.paymentStatus)}
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Xem tất cả giao dịch
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Tìm kiếm theo tên học sinh hoặc môn học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                    <SelectItem value="pending">Chờ thanh toán</SelectItem>
                    <SelectItem value="overdue">Quá hạn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử giao dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterTransactions().map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">
                            {transaction.studentName}
                          </h4>
                          {getPaymentStatusBadge(transaction.paymentStatus)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{transaction.subject}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                transaction.sessionDate
                              ).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{transaction.duration} phút</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span>
                              {getPaymentMethodText(transaction.paymentMethod)}
                            </span>
                          </div>
                        </div>

                        {transaction.paymentDate && (
                          <p className="text-sm text-gray-600">
                            Thanh toán:{" "}
                            {new Date(
                              transaction.paymentDate
                            ).toLocaleDateString("vi-VN")}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(transaction.rate)}/giờ
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {filterTransactions().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Không có giao dịch nào phù hợp</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Monthly Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Thu nhập theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEarnings.monthlyEarnings.slice(-6).map((month, index) => {
                  const maxAmount = Math.max(
                    ...mockEarnings.monthlyEarnings.map((m) => m.amount)
                  );
                  const percentage = (month.amount / maxAmount) * 100;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {month.month}
                        </span>
                        <div className="text-right">
                          <span className="font-semibold">
                            {formatCurrency(month.amount)}
                          </span>
                          <span className="text-sm text-gray-600 ml-2">
                            ({month.sessions} buổi)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Subject Earnings Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Thu nhập theo môn học</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(
                  new Set(mockEarnings.transactions.map((t) => t.subject))
                ).map((subject) => {
                  const subjectTransactions = mockEarnings.transactions.filter(
                    (t) => t.subject === subject && t.paymentStatus === "paid"
                  );
                  const totalAmount = subjectTransactions.reduce(
                    (sum, t) => sum + t.amount,
                    0
                  );
                  const totalSessions = subjectTransactions.length;
                  const averageRate =
                    totalSessions > 0 ? totalAmount / totalSessions : 0;

                  return (
                    <div
                      key={subject}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{subject}</h4>
                        <p className="text-sm text-gray-600">
                          {totalSessions} buổi học
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(totalAmount)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(averageRate)}/buổi TB
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payout Methods */}
        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phương thức nhận thanh toán</CardTitle>
              <p className="text-sm text-gray-600">
                Quản lý các phương thức nhận tiền từ học sinh
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockEarnings.payoutMethods.map((method) => (
                <div key={method.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        {method.type === "bank_transfer" ? (
                          <>
                            <h4 className="font-medium">{method.bankName}</h4>
                            <p className="text-sm text-gray-600">
                              {method.accountName} - {method.accountNumber}
                            </p>
                          </>
                        ) : (
                          <>
                            <h4 className="font-medium">MoMo</h4>
                            <p className="text-sm text-gray-600">
                              {method.phoneNumber}
                            </p>
                          </>
                        )}
                        {method.isDefault && (
                          <Badge variant="default" className="mt-1">
                            Mặc định
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Đặt mặc định
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Thêm phương thức thanh toán
              </Button>
            </CardContent>
          </Card>

          {/* Payout Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Thời hạn thanh toán mặc định</Label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ngày</SelectItem>
                      <SelectItem value="3">3 ngày</SelectItem>
                      <SelectItem value="7">7 ngày</SelectItem>
                      <SelectItem value="14">14 ngày</SelectItem>
                      <SelectItem value="30">30 ngày</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Phương thức thanh toán ưu tiên</Label>
                  <Select defaultValue="bank_transfer">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">
                        Chuyển khoản
                      </SelectItem>
                      <SelectItem value="cash">Tiền mặt</SelectItem>
                      <SelectItem value="momo">MoMo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Thông báo thanh toán</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      Nhắc nhở thanh toán khi đến hạn
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      Thông báo khi nhận được thanh toán
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Gửi hóa đơn tự động</span>
                  </label>
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
